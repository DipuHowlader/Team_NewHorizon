import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExoplanetData } from '@/types/exoplanet';
import { PlanetVisualization } from './PlanetVisualization';
import { ScientificChart } from './ScientificChart';
import { Calendar, MapPin, Thermometer, Clock, Star, ExternalLink, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExoplanetDetailProps {
  exoplanet: ExoplanetData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExoplanetDetail = ({ exoplanet, isOpen, onClose }: ExoplanetDetailProps) => {
  if (!exoplanet) return null;

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Transit': return 'bg-space-glow/20 text-space-glow border-space-glow/30';
      case 'Radial Velocity': return 'bg-space-purple/20 text-space-purple border-space-purple/30';
      case 'Direct Imaging': return 'bg-space-orange/20 text-space-orange border-space-orange/30';
      case 'Microlensing': return 'bg-space-green/20 text-space-green border-space-green/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getHabitabilityStatus = () => {
    if (!exoplanet.temperature) return 'Unknown';
    
    const temp = exoplanet.temperature;
    if (temp >= 273 && temp <= 373) return 'Potentially Habitable';
    if (temp >= 200 && temp <= 400) return 'Possibly Habitable';
    if (temp < 200) return 'Too Cold';
    return 'Too Hot';
  };

  const getHabitabilityColor = (status: string) => {
    switch (status) {
      case 'Potentially Habitable': return 'text-space-green';
      case 'Possibly Habitable': return 'text-space-orange';
      case 'Too Cold': return 'text-space-glow';
      case 'Too Hot': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-card border-primary/20 shadow-neon">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                {exoplanet.name}
              </DialogTitle>
              <p className="text-muted-foreground mt-1">
                Discovered via {exoplanet.discovery_method} in {exoplanet.discovery_year}
              </p>
            </div>
            <Badge className={`${getMethodColor(exoplanet.discovery_method)} border`}>
              {exoplanet.discovery_method}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PlanetVisualization exoplanet={exoplanet} />
          </motion.div>

          {/* Right Column - Planet Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Basic Info */}
            <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
              <h3 className="text-lg font-semibold text-primary">Planet Properties</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{exoplanet.distance ? `${exoplanet.distance} light years` : 'Distance not detected'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Discovered {exoplanet.discovery_year}</span>
                </div>
                {exoplanet.temperature && (
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span>{exoplanet.temperature} K</span>
                  </div>
                )}
                {exoplanet.orbital_period && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{exoplanet.orbital_period} day orbit</span>
                  </div>
                )}
                {exoplanet.host_star && (
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span>{exoplanet.host_star}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">Habitability:</span>
                  <span className={`font-medium ${getHabitabilityColor(getHabitabilityStatus())}`}>
                    {getHabitabilityStatus()}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {exoplanet.description && (
              <div className="bg-secondary/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-primary mb-2">About This Planet</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exoplanet.description}
                </p>
              </div>
            )}

            {/* Discovery Paper Link */}
            {exoplanet.discovery_paper && (
              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:border-primary hover:shadow-glow transition-space"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Discovery Paper
              </Button>
            )}
          </motion.div>
        </div>

        {/* Scientific Chart - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <ScientificChart exoplanet={exoplanet} />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};