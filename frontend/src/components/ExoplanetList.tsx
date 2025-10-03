import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExoplanetCard } from './ExoplanetCard';
import { ExoplanetFilters } from './ExoplanetFilters';
import { ExoplanetDetail } from './ExoplanetDetail';
import { ExoplanetData, ExoplanetFilters as FilterType } from '@/types/exoplanet';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExoplanetListProps {
  exoplanets: ExoplanetData[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onRetry?: () => void;
}

export const ExoplanetList = ({ exoplanets, loading, error, searchQuery, onRetry }: ExoplanetListProps) => {
  const [selectedPlanet, setSelectedPlanet] = useState<ExoplanetData | null>(null);
  const [filters, setFilters] = useState<FilterType>({
    search: searchQuery,
    yearRange: [1995, 2024],
    discoveryMethod: 'all',
    sizeRange: [0, 10],
    mission: 'all'
  });

  // Update search when prop changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  const filteredExoplanets = useMemo(() => {
    return exoplanets.filter(planet => {
      // Text search
      const searchMatch = 
        planet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (planet.host_star?.toLowerCase().includes(filters.search.toLowerCase()) ?? false) ||
        planet.discovery_method.toLowerCase().includes(filters.search.toLowerCase());

      // Year range
      const yearMatch = 
        planet.discovery_year >= filters.yearRange[0] && 
        planet.discovery_year <= filters.yearRange[1];

      // Discovery method
      const methodMatch = 
        filters.discoveryMethod === 'all' || 
        planet.discovery_method === filters.discoveryMethod;

      // Size range
      const sizeMatch = 
        planet.radius >= filters.sizeRange[0] && 
        planet.radius <= filters.sizeRange[1];
      
      const missionMatch =
        filters.mission === 'all' || 
        planet.mission?.toLowerCase() === filters.mission.toLowerCase();

return searchMatch && yearMatch && methodMatch && sizeMatch && missionMatch;

    });
  }, [exoplanets, filters]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-96 bg-gradient-card rounded-lg border border-primary/20 shadow-glow"
      >
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <div>
            <p className="text-lg font-medium">Exploring the universe...</p>
            <p className="text-muted-foreground">Discovering new worlds</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-96 bg-gradient-card rounded-lg border border-destructive/20 shadow-glow"
      >
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <div>
            <p className="text-lg font-medium text-destructive">Failed to load exoplanets</p>
            <p className="text-muted-foreground mb-4">{error}</p>
            {onRetry && (
              <Button 
                onClick={onRetry}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ExoplanetFilters
            filters={filters}
            onFiltersChange={setFilters}
            totalCount={exoplanets.length}
            filteredCount={filteredExoplanets.length}
          />
        </div>

        {/* Exoplanet Grid */}
        <div className="lg:col-span-3">
          {filteredExoplanets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-gradient-card rounded-lg border border-primary/20"
            >
              <div className="space-y-4">
                <div className="text-6xl opacity-50">🪐</div>
                <h3 className="text-xl font-semibold">No exoplanets found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search criteria or filters to discover more worlds.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredExoplanets.map((planet, index) => (
                  <motion.div
                    key={planet.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }}
                  >
                    <ExoplanetCard
                      exoplanet={planet}
                      onViewDetails={setSelectedPlanet}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Planet Detail Modal */}
      <ExoplanetDetail
        exoplanet={selectedPlanet}
        isOpen={!!selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />
    </div>
  );
};