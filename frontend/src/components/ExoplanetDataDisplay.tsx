import { motion } from 'framer-motion';
import { ExoplanetData } from '@/types/exoplanet';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface ExoplanetDataDisplayProps {
  exoplanet: ExoplanetData;
  showConfidence?: boolean;
}

export const ExoplanetDataDisplay = ({ exoplanet, showConfidence = true }: ExoplanetDataDisplayProps) => {
  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-muted-foreground';
    if (confidence >= 0.8) return 'text-green-500';
    if (confidence >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceIcon = (confidence?: number) => {
    if (!confidence) return <Clock className="h-4 w-4" />;
    if (confidence >= 0.8) return <CheckCircle className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const formatValue = (value: number | undefined, unit: string, confidence?: number) => {
    if (value === undefined) {
      return (
        <span className="text-muted-foreground italic">
          Not detected by AI
        </span>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <span>{value.toFixed(2)} {unit}</span>
        {showConfidence && confidence && (
          <div className={`flex items-center space-x-1 ${getConfidenceColor(confidence)}`}>
            {getConfidenceIcon(confidence)}
            <span className="text-xs">({Math.round(confidence * 100)}%)</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Radius</h4>
          {formatValue(exoplanet.radius, 'Earth radii', exoplanet.radius_confidence)}
        </div>
        
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Mass</h4>
          {formatValue(exoplanet.mass, 'Earth masses', exoplanet.mass_confidence)}
        </div>
        
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Distance</h4>
          {formatValue(exoplanet.distance, 'light years', exoplanet.distance_confidence)}
        </div>
        
        <div className="bg-card/50 rounded-lg p-4 border border-border/50">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">Temperature</h4>
          {formatValue(exoplanet.temperature, 'K', exoplanet.temperature_confidence)}
        </div>
      </div>

      {/* AI Model Info */}
      {exoplanet.ai_model_version && (
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">AI Detection Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Model Version:</span>
              <span className="font-mono">{exoplanet.ai_model_version}</span>
            </div>
            {exoplanet.detection_confidence && (
              <div className="flex justify-between">
                <span>Overall Confidence:</span>
                <span className={getConfidenceColor(exoplanet.detection_confidence)}>
                  {Math.round(exoplanet.detection_confidence * 100)}%
                </span>
              </div>
            )}
            {exoplanet.last_updated && (
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>{new Date(exoplanet.last_updated).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
