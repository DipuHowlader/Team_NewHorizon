export interface ModelPerformanceData {
    precision: number;
    recall: number;
    f1score: number;
    performance: number; // percentage
  }
  
  export const modelPerformance: Record<'kepler' | 'tess', ModelPerformanceData> = {
    kepler: { precision: 0.91, recall: 0.87, f1score: 0.89, performance: 89 },
    tess: { precision: 0.88, recall: 0.85, f1score: 0.86, performance: 86 },
  };
  