import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaHeart, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../services/api.ts";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  status: string;
  listedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
}

const BuyerDashboard: React.FC = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getFavorites();
      if (response.success && response.data) {
        setFavorites(response.data);
      } else {
        setError("Failed to fetch favorites");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch favorites";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await apiClient.updateProfile(profileForm);
      if (response.success) {
        setEditingProfile(false);
        await checkAuth(); // Refresh user data
        setError("");
      } else {
        setError("Failed to update profile");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update profile";
      setError(errorMessage);
    }
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const removeFavorite = async (propertyId: string) => {
    try {
      const response = await apiClient.removeFromFavorites(propertyId);
      if (response.success) {
        setFavorites(prev => prev.filter(prop => prop._id !== propertyId));
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (!user || user.role !== 'buyer') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in as a buyer to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Buyer Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
              </div>
              <button
                onClick={() => navigate('/properties')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Browse Properties
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaUser className="mr-2" />
                    Profile
                  </h2>
                  {!editingProfile ? (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleProfileUpdate}
                        className="text-green-600 hover:text-green-700"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => {
                          setEditingProfile(false);
                          setProfileForm({
                            name: user?.name || "",
                            phone: user?.phone || "",
                          });
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>

                {editingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="font-medium">{user.phone || "Not provided"}</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Favorites Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaHeart className="mr-2" />
                    My Favorites ({favorites.length})
                  </h2>
                  <button
                    onClick={() => navigate('/favorites')}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View All
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading favorites...</p>
                  </div>
                ) : favorites.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No favorites yet</p>
                    <button
                      onClick={() => navigate('/properties')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Browse Properties
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.slice(0, 4).map((property) => (
                      <div
                        key={property._id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handlePropertyClick(property._id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                            {property.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFavorite(property._id);
                            }}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            <FaTimes />
                          </button>
                        </div>
                        <p className="text-gray-600 text-xs mb-2">{property.location}</p>
                        <p className="text-blue-600 font-bold text-sm">
                          ₹{property.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
