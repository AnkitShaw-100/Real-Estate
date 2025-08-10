import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaSort, FaFilter, FaMap, FaList } from "react-icons/fa";
import apiClient from "../../services/api.ts";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  status: string;
  listedBy?: { name: string; email: string };
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
    bathrooms: searchParams.get("baths") || "",
    minArea: searchParams.get("minArea") || "",
    maxArea: searchParams.get("maxArea") || "",
    location: searchParams.get("loc") || "",
  });
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("order") || "desc");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

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
        keyword: searchTerm || undefined,
        propertyType: filters.propertyType || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        bedrooms: filters.bedrooms || undefined,
        bathrooms: filters.bathrooms || undefined,
        minArea: filters.minArea || undefined,
        maxArea: filters.maxArea || undefined,
        location: filters.location || undefined,
        sortBy,
        order: sortOrder,
      } as Record<string, string | number | boolean>);

      if (response.success && response.data) {
        setProperties(response.data.properties || []);
        if (response.data.total !== undefined) {
          setPagination({
            currentPage: response.data.page || 1,
            totalPages: response.data.pages || 1,
            totalItems: response.data.total,
            itemsPerPage: limit
          });
        }
        setError("");
      } else {
        setError("Failed to fetch properties");
        setProperties([]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch properties";
      setError(errorMessage);
      setProperties([]);
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
    if (filters.bathrooms) next.set("baths", filters.bathrooms);
    if (filters.minPrice) next.set("min", filters.minPrice);
    if (filters.maxPrice) next.set("max", filters.maxPrice);
    if (filters.minArea) next.set("minArea", filters.minArea);
    if (filters.maxArea) next.set("maxArea", filters.maxArea);
    if (sortBy) next.set("sortBy", sortBy);
    if (sortOrder) next.set("order", sortOrder);
    next.set("page", "1");
    next.set("limit", String(limit));
    setSearchParams(next);
    fetchProperties();
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
      minArea: "",
      maxArea: "",
      location: "",
    });
    setSortBy("createdAt");
    setSortOrder("desc");
    setSearchParams(new URLSearchParams({ page: "1", limit: String(limit) }));
    fetchProperties();
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const propertyTypes = ["house", "apartment", "land", "villa", "condo", "townhouse", "studio", "penthouse"];
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
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
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <FaFilter className="mr-2" />
                  {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
                </button>
                
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "list" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <FaList className="inline mr-1" />
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "map" 
                        ? "bg-white text-blue-600 shadow-sm" 
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <FaMap className="inline mr-1" />
                    Map
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt">Date Listed</option>
                  <option value="price">Price</option>
                  <option value="area">Area</option>
                  <option value="bedrooms">Bedrooms</option>
                </select>
                
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Bathrooms</label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                {/* Area Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Area (sq ft)</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minArea}
                    onChange={(e) => setFilters({ ...filters, minArea: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Area (sq ft)</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxArea}
                    onChange={(e) => setFilters({ ...filters, maxArea: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                  Apply Filters
                </button>
                <button onClick={clearFilters} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">
                  Clear All
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                {pagination && `${pagination.totalItems} properties found`}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Showing {properties.length} {properties.length === 1 ? 'result' : 'results'}
                {pagination && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
              </p>
              {properties.length > 0 && (
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-500">
                    {properties.filter(p => p.coordinates).length} with location data
                  </span>
                  {properties.filter(p => p.coordinates).length > 0 && (
                    <button
                      onClick={() => setViewMode("map")}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      <FaMap className="mr-1" />
                      View on Map
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Properties Display */}
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
                  <button 
                    onClick={clearFilters}
                    className="mt-4 text-blue-600 hover:text-blue-700 underline"
                  >
                    Clear filters and try again
                  </button>
                </div>
              ) : (
                <>
                  {/* List View */}
                  {viewMode === "list" && (
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
                              src={property.image || property.images?.[0] || '/placeholder-property.jpg'}
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
                            {property.listedBy && (
                              <div className="absolute bottom-4 left-4">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {property.listedBy.name}
                                </span>
                              </div>
                            )}
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
                                <p className="text-sm text-gray-500 capitalize">{property.propertyType}</p>
                              </div>
                              <div className="flex space-x-2">
                                {property.coordinates && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setViewMode("map");
                                    }}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-medium transition flex items-center"
                                  >
                                    <FaMap className="mr-1" />
                                    Map
                                  </button>
                                )}
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                  View Details
                                </button>
                              </div>
                            </div>
                            {property.createdAt && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500">
                                  Listed {new Date(property.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Map View */}
                  {viewMode === "map" && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      {properties.filter(p => p.coordinates).length > 0 ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">
                              Map View - {properties.filter(p => p.coordinates).length} Properties
                            </h3>
                            <p className="text-sm text-gray-500">
                              Properties with location data are shown below
                            </p>
                          </div>
                          
                          {/* Interactive Map Placeholder */}
                          <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                            <div className="text-center">
                              <FaMap className="text-5xl text-blue-400 mx-auto mb-4" />
                              <h4 className="text-xl font-semibold text-blue-600 mb-2">Interactive Map</h4>
                              <p className="text-blue-500 mb-4">
                                Map integration coming soon! For now, browse properties below.
                              </p>
                              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                {properties.filter(p => p.coordinates).length} properties with coordinates
                              </div>
                            </div>
                          </div>
                          
                          {/* Properties List for Map View */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {properties.map((property) => (
                              <div
                                key={property._id}
                                className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-all hover:shadow-md"
                                onClick={() => handlePropertyClick(property._id)}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                                    <img
                                      src={property.image || property.images?.[0] || '/placeholder-property.jpg'}
                                      alt={property.title}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-800 truncate">{property.title}</h4>
                                    <p className="text-sm text-gray-600 truncate flex items-center">
                                      <FaMapMarkerAlt className="mr-1 text-blue-500" />
                                      {property.location}
                                    </p>
                                    <p className="text-lg font-bold text-blue-600">₹{property.price.toLocaleString()}</p>
                                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                      <span>{property.bedrooms} beds</span>
                                      <span>•</span>
                                      <span>{property.bathrooms} baths</span>
                                      <span>•</span>
                                      <span>{property.area} sq ft</span>
                                    </div>
                                    {property.coordinates && (
                                      <div className="mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                        📍 Has location data
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <FaMap className="text-6xl text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Location Data</h3>
                            <p className="text-gray-500 mb-4">
                              None of the properties have coordinates yet.
                            </p>
                            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
                              Switch to List view to see all properties
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Pagination Controls */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                  <button
                    onClick={() => goToPage(Math.max(1, (pagination?.currentPage || 1) - 1))}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 rounded border bg-white disabled:opacity-50 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {/* Page Numbers */}
                  {(() => {
                    const pages = [];
                    const totalPages = pagination.totalPages;
                    const currentPage = pagination.currentPage;
                    
                    // Show first page
                    if (totalPages > 0) {
                      pages.push(
                        <button
                          key={1}
                          onClick={() => goToPage(1)}
                          className={`px-4 py-2 rounded border ${1 === currentPage ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                        >
                          1
                        </button>
                      );
                    }
                    
                    // Show ellipsis if needed
                    if (currentPage > 4) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 py-2 text-gray-500">...</span>
                      );
                    }
                    
                    // Show pages around current page
                    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                      if (i > 1 && i < totalPages) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => goToPage(i)}
                            className={`px-4 py-2 rounded border ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                          >
                            {i}
                          </button>
                        );
                      }
                    }
                    
                    // Show ellipsis if needed
                    if (currentPage < totalPages - 3) {
                      pages.push(
                        <span key="ellipsis2" className="px-2 py-2 text-gray-500">...</span>
                      );
                    }
                    
                    // Show last page
                    if (totalPages > 1) {
                      pages.push(
                        <button
                          key={totalPages}
                          onClick={() => goToPage(totalPages)}
                          className={`px-4 py-2 rounded border ${totalPages === currentPage ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-50'}`}
                        >
                          {totalPages}
                        </button>
                      );
                    }
                    
                    return pages;
                  })()}
                  
                  <button
                    onClick={() => goToPage(Math.min(pagination.totalPages, (pagination?.currentPage || 1) + 1))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-4 py-2 rounded border bg-white disabled:opacity-50 hover:bg-gray-50"
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