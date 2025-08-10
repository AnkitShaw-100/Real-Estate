const API_BASE_URL = 'http://localhost:5000/api';

// Type definitions
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
  isFavorite?: boolean;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  role?: 'buyer' | 'seller' | 'admin' | string;
  phone?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin' | string;
  phone?: string;
  isVerified?: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface PropertyData {
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities?: string[];
  status?: string;
  [key: string]: string | number | boolean | string[] | undefined;
}

interface ReviewData {
  rating: number;
  comment: string;
}

interface ContactData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

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
  };
  createdAt?: string;
}

interface RequestOptions {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token
  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  // Helper method to set auth token
  setAuthToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Helper method to get headers
  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Generic request method
  async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData: UserData): Promise<ApiResponse<User>> {
    const response = await this.request<{ token: string; data: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.data?.token) {
      this.setAuthToken(response.data.token);
    }

    return {
      success: true,
      data: response.data?.data || response.data,
      message: response.message || 'User registered successfully'
    };
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ token: string; data: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data?.token) {
      this.setAuthToken(response.data.token);
      return {
        success: true,
        data: {
          user: response.data.data,
          token: response.data.token
        },
        message: 'Login successful'
      };
    }

    return {
      success: false,
      error: 'Login failed'
    };
  }

  async logout(): Promise<void> {
    this.setAuthToken(null);
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: Partial<UserData>): Promise<ApiResponse> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(passwordData: { currentPassword: string; newPassword: string }): Promise<ApiResponse> {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    });
  }

  // Property methods
  async getProperties(filters: Record<string, string | number | boolean> = {}): Promise<ApiResponse<{ properties: Property[], total: number, page: number, pages: number }>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    return this.request(endpoint);
  }

  async getProperty(id: string | number): Promise<ApiResponse<Property>> {
    return this.request(`/properties/${id}`);
  }

  async createProperty(propertyData: PropertyData | FormData): Promise<ApiResponse> {
    // Handle both JSON and FormData (for file uploads)
    if (propertyData instanceof FormData) {
      const url = `${this.baseURL}/properties`;
      const config = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: propertyData,
      };

      try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Property creation failed');
        }

        return { success: true, data, message: 'Property created successfully' };
      } catch (error) {
        console.error('Property creation error:', error);
        throw error;
      }
    } else {
      return this.request('/properties', {
        method: 'POST',
        body: JSON.stringify(propertyData),
      });
    }
  }

  async getUserProperties(): Promise<ApiResponse<Property[]>> {
    return this.request('/properties/my');
  }

  async updateProperty(id: string | number, propertyData: Partial<PropertyData>): Promise<ApiResponse> {
    return this.request(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  async deleteProperty(id: string | number): Promise<ApiResponse> {
    return this.request(`/properties/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeaturedProperties(): Promise<ApiResponse> {
    return this.request('/properties/featured');
  }

  async addReview(propertyId: string | number, reviewData: ReviewData): Promise<ApiResponse> {
    return this.request(`/properties/${propertyId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // User methods
  async getUserProfile(): Promise<ApiResponse> {
    return this.request('/users/profile');
  }

  async updateUserProfile(profileData: Partial<UserData>): Promise<ApiResponse> {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Favorites methods
  async getFavorites(): Promise<ApiResponse<Property[]>> {
    return this.request('/properties/favorites');
  }

  async addToFavorites(propertyId: string | number): Promise<ApiResponse> {
    return this.request(`/properties/favorites/${propertyId}`, {
      method: 'POST',
    });
  }

  async removeFromFavorites(propertyId: string | number): Promise<ApiResponse> {
    return this.request(`/properties/favorites/${propertyId}`, {
      method: 'DELETE',
    });
  }

  // Contact methods
  async submitContact(contactData: ContactData): Promise<ApiResponse> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // File upload helper
  async uploadFile(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${this.baseURL}/upload`;
    const config = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Upload failed');
      }

      return data.data;
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return this.request('/health');
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();

export default apiClient; 