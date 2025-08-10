import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaHeart, FaShare, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
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
  amenities?: string[];
  listedBy?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  owner?: {
    phone?: string;
  };
  createdAt?: string;
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      fetchProperty();
      checkFavoriteStatus();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProperty(id!);
      if (response.success && response.data) {
        setProperty(response.data);
      } else {
        setError("Property not found");
      }
    } catch (error) {
      console.error("Error fetching property:", error);
      setError("Failed to fetch property details");
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!user) return;
    
    try {
      const response = await apiClient.getFavorites();
      if (response.success && response.data) {
        const isFav = response.data.some((fav: Property) => fav._id === id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!id) return;

    try {
      setFavoriteLoading(true);
      if (isFavorite) {
        await apiClient.removeFromFavorites(id);
        setIsFavorite(false);
      } else {
        await apiClient.addToFavorites(id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleContact = (type: 'phone' | 'email' | 'whatsapp') => {
    if (!property?.listedBy) return;

    switch (type) {
      case 'phone':
        // Try to get phone from property owner info or use a default
        const phoneNumber = property.owner?.phone || '+91-XXXXXXXXXX';
        window.open(`tel:${phoneNumber}`);
        break;
      case 'email':
        window.open(`mailto:${property.listedBy.email}`);
        break;
      case 'whatsapp':
        const message = `Hi, I'm interested in your property: ${property.title} at ${property.location} for ₹${property.price.toLocaleString()}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl);
        break;
    }
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
          <p className="text-gray-600 mb-6">{error || "The property you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 ? property.images : [property.image];

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
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <button
                    onClick={() => navigate('/properties')}
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                  >
                    Properties
                  </button>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-sm font-medium text-gray-500">{property.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Property Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaBed className="mr-1" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-1" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-1" />
                    <span>{property.area} sq ft</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-4">
                <button
                  onClick={toggleFavorite}
                  disabled={favoriteLoading}
                  className={`flex items-center px-4 py-2 rounded-lg border transition ${
                    isFavorite
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <FaHeart className="mr-2" />
                  {favoriteLoading ? '...' : isFavorite ? 'Favorited' : 'Favorite'}
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: property.title,
                        text: `Check out this ${property.propertyType} in ${property.location} for ₹${property.price.toLocaleString()}`,
                        url: window.location.href,
                      });
                    } else {
                      // Fallback: copy to clipboard
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaShare className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="relative">
                  <img
                    src={images[selectedImage]}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === selectedImage ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {images.length > 1 && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`h-20 rounded-lg overflow-hidden ${
                          index === selectedImage ? 'ring-2 ring-blue-500' : ''
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Basic Information</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Property Type:</span>
                        <span className="font-medium">{property.propertyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={`font-medium ${
                          property.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {property.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Listed:</span>
                        <span className="font-medium">
                          {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Specifications</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Bedrooms:</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bathrooms:</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span className="font-medium">{property.area} sq ft</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Price Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-8">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
                  <p className="text-gray-500">Property Price</p>
                </div>

                {property.listedBy && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact Seller</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleContact('phone')}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <FaPhone className="mr-2" />
                        Call Seller
                      </button>
                      <button
                        onClick={() => handleContact('whatsapp')}
                        className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <FaWhatsapp className="mr-2" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleContact('email')}
                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <FaEnvelope className="mr-2" />
                        Send Email
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Seller Info */}
              {property.listedBy && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Listed By</h3>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-blue-600">
                        {property.listedBy.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">{property.listedBy.name}</p>
                    <p className="text-sm text-gray-600">{property.listedBy.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailPage; 