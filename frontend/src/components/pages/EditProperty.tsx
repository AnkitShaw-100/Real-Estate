import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUpload, FaTimes, FaPlus, FaEdit, FaSave } from "react-icons/fa";
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
  amenities: string[];
  listedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
}

const EditProperty: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [property, setProperty] = useState<Property | null>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: [] as string[],
    status: "active"
  });

  const [newAmenity, setNewAmenity] = useState("");

  const propertyTypes = [
    "house", "apartment", "land", "villa", "condo", "townhouse", "studio", "penthouse"
  ];

  const availableAmenities = [
    "Parking", "Garden", "Balcony", "Terrace", "Swimming Pool", "Gym", 
    "Security", "Lift", "Power Backup", "Water Supply", "Internet", "Furnished"
  ];

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProperty(id!);
      if (response.success && response.data) {
        const propertyData = response.data;
        setProperty(propertyData);
        setForm({
          title: propertyData.title,
          description: propertyData.description,
          price: propertyData.price.toString(),
          location: propertyData.location,
          propertyType: propertyData.propertyType,
          bedrooms: propertyData.bedrooms.toString(),
          bathrooms: propertyData.bathrooms.toString(),
          area: propertyData.area.toString(),
          amenities: propertyData.amenities || [],
          status: propertyData.status
        });
        
        // Set existing images
        if (propertyData.images && propertyData.images.length > 0) {
          setImageUrls(propertyData.images);
        } else if (propertyData.image) {
          setImageUrls([propertyData.image]);
        }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length + newImages.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    setNewImages(prev => [...prev, ...validFiles]);
    
    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    // If it's a new image, remove from newImages array
    if (index >= (property?.images?.length || 0)) {
      const newIndex = index - (property?.images?.length || 0);
      setNewImages(prev => prev.filter((_, i) => i !== newIndex));
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !form.amenities.includes(newAmenity.trim())) {
      setForm(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity("");
    }
  };

  const removeAmenity = (amenity: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Validate form
      if (!form.title || !form.description || !form.price || !form.location || 
          !form.propertyType || !form.bedrooms || !form.bathrooms || !form.area) {
        throw new Error("Please fill in all required fields");
      }

      // Validate price
      if (parseFloat(form.price) <= 0) {
        throw new Error("Price must be greater than 0");
      }

      // Validate area
      if (parseFloat(form.area) <= 0) {
        throw new Error("Area must be greater than 0");
      }

      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('location', form.location);
      formData.append('propertyType', form.propertyType.toLowerCase());
      formData.append('bedrooms', form.bedrooms);
      formData.append('bathrooms', form.bathrooms);
      formData.append('area', form.area);
      formData.append('status', form.status);
      
      // Add amenities as array
      form.amenities.forEach(amenity => {
        formData.append('amenities[]', amenity);
      });

      // Add new images if available
      if (newImages.length > 0) {
        newImages.forEach((image, index) => {
          if (index === 0) {
            formData.append('image', image);
          } else {
            formData.append('images', image);
          }
        });
      }

      const response = await apiClient.updateProperty(id!, formData);
      
      if (response.success) {
        setSuccess("Property updated successfully! Redirecting to dashboard...");
        setTimeout(() => {
          navigate('/seller/dashboard');
        }, 2000);
      }
    } catch (error: any) {
      console.error("Update property error:", error);
      setError(error.message || "Failed to update property. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.role !== 'seller') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You need to be logged in as a seller to edit properties.</p>
        </div>
      </div>
    );
  }

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

  if (error && !property) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/seller/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Property</h1>
            <p className="text-gray-600">Update your property information</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter property title"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your property..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select property type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="sold">Sold</option>
                  <option value="rented">Rented</option>
                </select>
              </div>

              {/* Property Details */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of bedrooms"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms *
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Number of bathrooms"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (sq ft) *
                </label>
                <input
                  type="number"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Property area"
                />
              </div>

              {/* Amenities */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
                
                <div className="mb-4">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newAmenity}
                      onChange={(e) => setNewAmenity(e.target.value)}
                      placeholder="Add custom amenity"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addAmenity}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableAmenities.map(amenity => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={form.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setForm(prev => ({
                                ...prev,
                                amenities: [...prev.amenities, amenity]
                              }));
                            } else {
                              setForm(prev => ({
                                ...prev,
                                amenities: prev.amenities.filter(a => a !== amenity)
                              }));
                            }
                          }}
                          className="mr-2"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                {form.amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Selected Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {form.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                        >
                          {amenity}
                          <button
                            type="button"
                            onClick={() => removeAmenity(amenity)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <FaTimes />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Image Management */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Images</h2>
                
                {/* Current Images */}
                {imageUrls.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Current Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Property ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add New Images */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                    <p className="text-gray-600">Click to upload additional images (Max 5 total)</p>
                    <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 5MB each</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/seller/dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <FaSave />
                <span>{saving ? "Updating Property..." : "Update Property"}</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditProperty;
