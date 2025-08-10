import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
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
  images: string[];
  status: string;
  createdAt?: string;
}

const SellerDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== 'seller') {
      navigate('/login');
      return;
    }
    fetchProperties();
  }, [user, navigate]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getUserProperties();
      if (response.success && response.data) {
        setProperties(response.data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch properties";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = () => {
    navigate('/seller/add-property');
  };

  const handleEditProperty = (propertyId: string) => {
    navigate(`/seller/edit-property/${propertyId}`);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        await apiClient.deleteProperty(propertyId);
        setProperties(properties.filter(p => p._id !== propertyId));
        // Show success message
        setError(""); // Clear any previous errors
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to delete property";
        setError(errorMessage);
      }
    }
  };

  const handleStatusChange = async (propertyId: string, newStatus: string) => {
    try {
      await apiClient.updateProperty(propertyId, { status: newStatus });
      setProperties(properties.map(p => 
        p._id === propertyId ? { ...p, status: newStatus } : p
      ));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update property status";
      setError(errorMessage);
    }
  };

  const handleViewProperty = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in as a seller to access this page.</p>
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
                <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user.name}</p>
              </div>
              <button
                onClick={handleAddProperty}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
              >
                <FaPlus />
                <span>Add New Property</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">Total Properties</h3>
              <p className="text-3xl font-bold text-blue-600">{properties.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">Active Listings</h3>
              <p className="text-3xl font-bold text-green-600">
                {properties.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800">Total Value</h3>
              <p className="text-3xl font-bold text-purple-600">
                ₹{properties.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Properties List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Your Properties</h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading properties...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-600">{error}</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No properties found. Add your first property!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map((property) => (
                      <tr key={property._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={property.images[0] || '/placeholder-property.jpg'}
                                alt={property.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {property.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {property.propertyType} • {property.bedrooms} bed • {property.bathrooms} bath
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ₹{property.price.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{property.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={property.status}
                            onChange={(e) => handleStatusChange(property._id, e.target.value)}
                            className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                              property.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : property.status === 'sold'
                                ? 'bg-red-100 text-red-800'
                                : property.status === 'rented'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewProperty(property._id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEditProperty(property._id)}
                              className="text-green-600 hover:text-green-900"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellerDashboard; 