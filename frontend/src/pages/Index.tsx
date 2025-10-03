import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { ExoplanetList } from '@/components/ExoplanetList';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { useExoplanets } from '@/hooks/useExoplanets';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { exoplanets, loading, error, refetch } = useExoplanets();

  return (
    <div className="min-h-screen bg-gradient-space relative">
      {/* Animated Starfield Background */}
      <StarfieldBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation 
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              ExoAI
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to ExoAI by Team NewHorizon! Discover exoplanets through our advanced AI model. Journey through space to learn about 
              distant worlds, their properties, and the cutting-edge science behind their discovery for the NASA International Space Apps Challenge.
            </motion.p>
            <motion.h2 
               className="text-2xl md:text-4xl font-semibold my-10 bg-gradient-neon bg-clip-text text-transparent"
               initial={{ scale: 0.9 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            >
              All Detected Exoplanets
              </motion.h2>
          </motion.div>

          {/* Exoplanet Explorer */}
          <ExoplanetList 
            exoplanets={exoplanets}
            loading={loading}
            error={error}
            searchQuery={searchQuery}
            onRetry={refetch}
          />

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 pt-8 border-t border-primary/20 text-center"
          >
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-neon rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">NH</span>
                </div>
                <span className="text-sm text-muted-foreground">Team NewHorizon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">NASA</span>
                </div>
                <span className="text-sm text-muted-foreground">Space Apps Challenge 2024</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with React, Three.js, and the power of space exploration
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
