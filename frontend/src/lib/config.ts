// Environment configuration for API endpoints
export const config = {
  // API Configuration
  // In production (when served by nginx), use a relative base so requests go to the same origin
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? '',
  
  // API Endpoints
  ENDPOINTS: {
    EXOPLANETS: '/exoplanets',
    EXOPLANET_BY_ID: (id: string) => `/exoplanets/${id}`,
    SEARCH: (query: string) => `/exoplanets?search=${encodeURIComponent(query)}`,
  },
  
  // Request Configuration
  REQUEST_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  
  // Development flags
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${config.API_BASE_URL}${endpoint}`;
};
