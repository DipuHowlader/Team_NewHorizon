// AI Model Configuration
// This file makes it easy to adapt to different AI model capabilities

export interface AIModelConfig {
  name: string;
  version: string;
  capabilities: {
    canDetectRadius: boolean;
    canDetectMass: boolean;
    canDetectDistance: boolean;
    canDetectTemperature: boolean;
    canDetectOrbitalPeriod: boolean;
    canDetectHostStar: boolean;
    providesConfidenceScores: boolean;
    providesGraphData: boolean;
  };
  fallbackBehavior: {
    showPlaceholder: boolean;
    showConfidence: boolean;
    showModelInfo: boolean;
  };
}

// Default configuration for current AI model
export const currentAIConfig: AIModelConfig = {
  name: "ExoAI Detection Model",
  version: "1.0.0",
  capabilities: {
    canDetectRadius: true,
    canDetectMass: true,
    canDetectDistance: true,
    canDetectTemperature: true,
    canDetectOrbitalPeriod: true,
    canDetectHostStar: true,
    providesConfidenceScores: true,
    providesGraphData: true,
  },
  fallbackBehavior: {
    showPlaceholder: true,
    showConfidence: true,
    showModelInfo: true,
  },
};

// Example: Limited AI model configuration
export const limitedAIConfig: AIModelConfig = {
  name: "ExoAI Basic Model",
  version: "0.5.0",
  capabilities: {
    canDetectRadius: false,        // AI can't detect radius yet
    canDetectMass: false,         // AI can't detect mass yet
    canDetectDistance: true,      // AI can detect distance
    canDetectTemperature: true,   // AI can detect temperature
    canDetectOrbitalPeriod: false, // AI can't detect orbital period
    canDetectHostStar: true,      // AI can detect host star
    providesConfidenceScores: false, // No confidence scores yet
    providesGraphData: false,     // No graph data yet
  },
  fallbackBehavior: {
    showPlaceholder: true,
    showConfidence: false,
    showModelInfo: true,
  },
};

// Function to get current AI configuration
export const getAIConfig = (): AIModelConfig => {
  // In the future, this could be fetched from your backend
  // or determined by environment variables
  return currentAIConfig;
};

// Function to check if a field should be displayed
export const shouldDisplayField = (field: keyof AIModelConfig['capabilities']): boolean => {
  const config = getAIConfig();
  return config.capabilities[field];
};

// Function to get field display configuration
export const getFieldConfig = (field: string) => {
  const config = getAIConfig();
  
  return {
    shouldShow: shouldDisplayField(field as keyof AIModelConfig['capabilities']),
    showConfidence: config.fallbackBehavior.showConfidence,
    showPlaceholder: config.fallbackBehavior.showPlaceholder,
  };
};
