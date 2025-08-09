import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
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
  owner?: { name: string; phone: string };
  createdAt?: string;
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

const DEFAULT_LIMIT = 9;

const PropertyListing: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [filters, setFilters] = useState({
    propertyType: searchParams.get("type") || "",
    minPrice: searchParams.get("min") || "",
    maxPrice: searchParams.get("max") || "",
    bedrooms: searchParams.get("beds") || "",
    location: searchParams.get("loc") || "",
  });

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || String(DEFAULT_LIMIT), 10);

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProperties({
        page,
        limit,
        search: searchTerm || undefined,
        propertyType: filters.propertyType || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        bedrooms: filters.bedrooms || undefined,
        city: filters.location || undefined,
      } as any);

      if (response.success && response.data) {
        setProperties(response.data);
        if (response.pagination) {
          setPagination({
            currentPage: response.pagination.currentPage,
            totalPages: response.pagination.totalPages,
            totalItems: response.pagination.totalItems,
            itemsPerPage: response.pagination.limit
          });
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (targetPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(targetPage));
    next.set("limit", String(limit));
    setSearchParams(next);
  };

  const applyFilters = () => {
    const next = new URLSearchParams();
    if (searchTerm) next.set("q", searchTerm);
    if (filters.propertyType) next.set("type", filters.propertyType);
    if (filters.location) next.set("loc", filters.location);
    if (filters.bedrooms) next.set("beds", filters.bedrooms);
    if (filters.minPrice) next.set("min", filters.minPrice);
    if (filters.maxPrice) next.set("max", filters.maxPrice);
    next.set("page", "1");
    next.set("limit", String(limit));
    setSearchParams(next);
    fetchProperties();
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
  const locations = [...new Set(properties.map(p => p.location))];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Dream Property</h1>
            <p className="text-gray-600">Discover the perfect place to call home</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Beds</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Apply */}
              <div className="flex items-center">
                <button onClick={applyFilters} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {properties.length} {properties.length === 1 ? 'result' : 'results'}
              {pagination && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
            </p>
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <>
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No properties found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <motion.div
                      key={property._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handlePropertyClick(property._id)}
                    >
                      <div className="relative h-48">
                        <img
                          src={property.images[0] || '/placeholder-property.jpg'}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.title}</h3>
                        <div className="flex items-center text-gray-600 mb-3">
                          <FaMapMarkerAlt className="mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center"><FaBed className="mr-1" /><span>{property.bedrooms}</span></div>
                            <div className="flex items-center"><FaBath className="mr-1" /><span>{property.bathrooms}</span></div>
                            <div className="flex items-center"><FaRulerCombined className="mr-1" /><span>{property.area} sq ft</span></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{property.propertyType}</p>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => goToPage(Math.max(1, (pagination?.currentPage || 1) - 1))}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 rounded border bg-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from({ length: pagination.totalPages }).slice(0, 10).map((_, idx) => {
                    const p = idx + 1;
                    return (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`px-4 py-2 rounded border ${p === pagination.currentPage ? 'bg-blue-600 text-white' : 'bg-white'}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => goToPage(Math.min(pagination.totalPages, (pagination?.currentPage || 1) + 1))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 rounded border bg-white disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyListing; 