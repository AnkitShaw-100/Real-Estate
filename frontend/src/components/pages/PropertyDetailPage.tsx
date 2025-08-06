import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaPhone, FaEnvelope, FaHeart, FaShare } from "react-icons/fa";
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
  images: string[];
  status: string;
  owner: {
    _id: string;
    name: string;
    phone: string;
    email: string;
  };
  amenities: string[];
  createdAt: string;
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProperty(id!);
      if (response.success) {
        setProperty(response.data);
        // Check if property is in favorites
        try {
          const favoriteResponse = await apiClient.checkFavorite(id!);
          setIsFavorite(favoriteResponse.isFavorite);
        } catch (error) {
          // Property not in favorites
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch property");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorite) {
        await apiClient.removeFromFavorites(id!);
        setIsFavorite(false);
      } else {
        await apiClient.addToFavorites(id!);
        setIsFavorite(true);
      }
    } catch (error: any) {
      console.error('Favorite error:', error);
    }
  };

  const handleContactOwner = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Navigate to contact form or open contact modal
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The property you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Properties
          </button>
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
          {/* Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/properties')}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Back to Properties
            </button>
          </div>

          {/* Property Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  ₹{property.price.toLocaleString()}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddToFavorites}
                  className={`p-3 rounded-lg border ${
                    isFavorite 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-red-500'
                  }`}
                >
                  <FaHeart />
                </button>
                <button className="p-3 rounded-lg border border-gray-300 bg-white text-gray-600 hover:border-blue-500">
                  <FaShare />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="mb-4">
                  <img
                    src={property.images[selectedImage] || '/placeholder-property.jpg'}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {property.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`h-20 rounded-lg overflow-hidden ${
                          selectedImage === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Property Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center">
                    <FaBed className="text-blue-600 mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                      <p className="text-lg font-semibold">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-blue-600 mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                      <p className="text-lg font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-blue-600 mr-3 text-xl" />
                    <div>
                      <p className="text-sm text-gray-600">Area</p>
                      <p className="text-lg font-semibold">{property.area} sq ft</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                {property.amenities && property.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Owner */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Owner</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <FaPhone className="text-blue-600 mr-3" />
                    <span className="text-gray-600">{property.owner.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-blue-600 mr-3" />
                    <span className="text-gray-600">{property.owner.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleContactOwner}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
                >
                  Contact Owner
                </button>
              </div>

              {/* Property Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${
                      property.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="font-medium">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailPage; 