import { ExoplanetData } from '@/types/exoplanet';
import { config } from './config';

const API_BASE_URL = config.API_BASE_URL;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get all exoplanets
  async getExoplanets(): Promise<ExoplanetData[]> {
    try {
      const data = await this.request<ExoplanetData[]>('/exoplanets');
      return data;
    } catch (error) {
      console.error('Failed to fetch exoplanets:', error);
      throw new Error('Failed to load exoplanets. Please try again later.');
    }
  }

  // Get a single exoplanet by ID
  async getExoplanetById(id: string): Promise<ExoplanetData> {
    try {
      const data = await this.request<ExoplanetData>(`/exoplanets/${id}`);
      return data;
    } catch (error) {
      console.error(`Failed to fetch exoplanet ${id}:`, error);
      throw new Error(`Failed to load exoplanet ${id}. Please try again later.`);
    }
  }

  // Search exoplanets (if your backend supports it)
  async searchExoplanets(query: string): Promise<ExoplanetData[]> {
    try {
      const data = await this.request<ExoplanetData[]>(`/exoplanets?search=${encodeURIComponent(query)}`);
      return data;
    } catch (error) {
      console.error('Failed to search exoplanets:', error);
      throw new Error('Failed to search exoplanets. Please try again later.');
    }
  }
}

// Create a singleton instance
export const apiService = new ApiService();

// Export for testing or custom configuration
export { ApiService };
