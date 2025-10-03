export interface ExoplanetData {
  id: string;
  name: string;
  // Core fields that AI should always detect
  discovery_method: 'Transit' | 'Radial Velocity' | 'Direct Imaging' | 'Microlensing' | 'Astrometry';
  discovery_year: number;
  
  // Optional fields that AI might not always detect
  mission?: string;
  radius?: number; // Earth radii
  mass?: number; // Earth masses
  distance?: number; // light years
  orbital_period?: number; // days
  temperature?: number; // Kelvin
  host_star?: string;
  
  // AI confidence scores (optional)
  radius_confidence?: number; // 0-1 confidence score
  mass_confidence?: number; // 0-1 confidence score
  distance_confidence?: number; // 0-1 confidence score
  
  // Data visualization
  graph_data?: Array<{
    time: number;
    brightness?: number;
    velocity?: number;
  }>;
  
  // Additional info
  description?: string;
  discovery_paper?: string;
  
  // AI model metadata
  ai_model_version?: string;
  detection_confidence?: number; // Overall confidence
  last_updated?: string; // When AI model last analyzed this
}

export interface ExoplanetFilters {
  search: string;
  yearRange: [number, number];
  discoveryMethod: string;
  sizeRange: [number, number];
  mission: string;
}