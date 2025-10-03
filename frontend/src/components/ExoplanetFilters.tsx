import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ExoplanetFilters as FilterType } from '@/types/exoplanet';
import { Filter, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExoplanetFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  totalCount: number;
  filteredCount: number;
}

export const ExoplanetFilters = ({ 
  filters, 
  onFiltersChange, 
  totalCount, 
  filteredCount 
}: ExoplanetFiltersProps) => {
  const resetFilters = () => {
    onFiltersChange({
      search: '',
      yearRange: [1995, 2024],
      discoveryMethod: 'all',
      sizeRange: [0, 10],
      mission: 'all'
    });
  };

  const methods = [
    'all',
    'Transit',
    'Radial Velocity', 
    'Direct Imaging',
    'Microlensing',
    'Astrometry'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-gradient-card border-primary/20 shadow-glow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Filter className="h-5 w-5 text-primary" />
            <span>Filters</span>
          </CardTitle>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-sm">
              {filteredCount} of {totalCount} planets
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-primary"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Discovery Method Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Discovery Method</label>
            <Select
              value={filters.discoveryMethod}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, discoveryMethod: value })
              }
            >
              <SelectTrigger className="bg-secondary/50 border-primary/20 focus:border-primary">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                {methods.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method === 'all' ? 'All Methods' : method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Mission Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Mission</label>
            <Select
              value={filters.mission}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, mission: value })
              }
            >
              <SelectTrigger className="bg-secondary/50 border-primary/20 focus:border-primary">
                <SelectValue placeholder="Select mission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Missions</SelectItem>
                <SelectItem value="Kepler">Kepler</SelectItem>
                <SelectItem value="TESS">TESS</SelectItem>
              </SelectContent>
            </Select>
          </div>



          {/* Discovery Year Range */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Discovery Year: {filters.yearRange[0]} - {filters.yearRange[1]}
            </label>
            <Slider
              value={filters.yearRange}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, yearRange: value as [number, number] })
              }
              min={1995}
              max={2024}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1995</span>
              <span>2024</span>
            </div>
          </div>

          {/* Planet Size Range */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Planet Size: {filters.sizeRange[0]} - {filters.sizeRange[1]} R⊕
            </label>
            <Slider
              value={filters.sizeRange}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, sizeRange: value as [number, number] })
              }
              min={0}
              max={10}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 R⊕</span>
              <span>10 R⊕</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};