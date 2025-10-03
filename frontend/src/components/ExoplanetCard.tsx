import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExoplanetData } from '@/types/exoplanet';

import { Calendar, Ruler, Weight, MapPin, Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { getAIConfig } from '@/lib/ai-config';

interface ExoplanetCardProps {
  exoplanet: ExoplanetData;
  onViewDetails: (exoplanet: ExoplanetData) => void;
}

export const ExoplanetCard = ({ exoplanet, onViewDetails }: ExoplanetCardProps) => {
  const aiConfig = getAIConfig();
  
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Transit': return 'bg-space-glow/20 text-space-glow border-space-glow/30';
      case 'Radial Velocity': return 'bg-space-purple/20 text-space-purple border-space-purple/30';
      case 'Direct Imaging': return 'bg-space-orange/20 text-space-orange border-space-orange/30';
      case 'Microlensing': return 'bg-space-green/20 text-space-green border-space-green/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getPlanetSize = (radius?: number) => {
    if (!radius) return 'Unknown Size';
    if (radius < 1.25) return 'Earth-like';
    if (radius < 2) return 'Super-Earth';
    if (radius < 4) return 'Sub-Neptune';
    return 'Gas Giant';
  };

  const getConfidenceIcon = (confidence?: number) => {
    if (!confidence) return null;
    if (confidence >= 0.8) return <CheckCircle className="h-3 w-3 text-green-500" />;
    if (confidence >= 0.6) return <AlertCircle className="h-3 w-3 text-yellow-500" />;
    return <AlertCircle className="h-3 w-3 text-red-500" />;
  };

  const formatValue = (value: number | undefined, unit: string, confidence?: number) => {
    if (value === undefined) {
      return (
        <span className="text-muted-foreground italic text-sm">
          Not detected
        </span>
      );
    }
    return (
      <div className="flex items-center space-x-1">
        <span>{value.toFixed(2)} {unit}</span>
        {confidence && getConfidenceIcon(confidence)}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 hover:shadow-glow transition-space group overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {exoplanet.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {exoplanet.host_star && `Orbiting ${exoplanet.host_star}`}
              </CardDescription>
            </div>
            <Badge className={`${getMethodColor(exoplanet.discovery_method)} border`}>
              {exoplanet.discovery_method}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{exoplanet.discovery_year}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {formatValue(exoplanet.distance, 'ly', exoplanet.distance_confidence)}
            </div>
            <div className="flex items-center space-x-2">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              {formatValue(exoplanet.radius, 'R⊕', exoplanet.radius_confidence)}
            </div>
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-muted-foreground" />
              {formatValue(exoplanet.mass, 'M⊕', exoplanet.mass_confidence)}
            </div>
          </div>
          
          <div className="pt-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {getPlanetSize(exoplanet.radius)}
            </Badge>
            {exoplanet.ai_model_version && (
              <Badge variant="secondary" className="text-xs">
                AI v{exoplanet.ai_model_version}
              </Badge>
            )}
            {exoplanet.detection_confidence && (
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  exoplanet.detection_confidence >= 0.8 ? 'text-green-600 border-green-600' :
                  exoplanet.detection_confidence >= 0.6 ? 'text-yellow-600 border-yellow-600' :
                  'text-red-600 border-red-600'
                }`}
              >
                {Math.round(exoplanet.detection_confidence * 100)}% confidence
              </Badge>
            )}
          </div>
          
          <Button 
            onClick={() => onViewDetails(exoplanet)}
            className="w-full bg-primary hover:bg-primary/90 hover:shadow-glow transition-space"
          >
            <Eye className="h-4 w-4 mr-2" />
            Explore Planet
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};