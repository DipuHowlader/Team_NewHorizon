import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Telescope, Info, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Navigation = ({ onSearch, searchQuery }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-glow"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo and Title */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 bg-gradient-neon rounded-lg shadow-neon">
              <Telescope className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                ExoAI Explorer
              </h1>
              <p className="text-sm text-muted-foreground">Team NewHorizon - NASA Space Apps Challenge</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              variant={location.pathname === '/' ? 'default' : 'ghost'}
              className="flex items-center space-x-2 transition-space hover:shadow-glow"
              onClick={() => navigate('/')}
            >
              <Telescope className="h-4 w-4" />
              <span>Exoplanets</span>
            </Button>
            
            <Button
              variant={location.pathname === '/ModelPerformance' ? 'default' : 'ghost'}
              className="flex items-center space-x-2 transition-space hover:shadow-glow"
              onClick={() => navigate('/ModelPerformance')}
            >
              <Telescope className="h-4 w-4" />
              <span>Model Performance</span>
            </Button>

            
            <Button
              variant={location.pathname === '/team' ? 'default' : 'ghost'}
              className="flex items-center space-x-2 transition-space hover:shadow-glow"
              onClick={() => navigate('/team')}
            >
              <Users className="h-4 w-4" />
              <span>Team</span>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {location.pathname === '/' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-md mx-auto md:mx-0"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search exoplanets..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-secondary/50 border-primary/20 focus:border-primary focus:shadow-glow transition-space"
            />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};