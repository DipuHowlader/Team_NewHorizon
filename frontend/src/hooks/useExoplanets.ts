import { useState, useEffect } from 'react';
import { ExoplanetData } from '@/types/exoplanet';
import { apiService } from '@/lib/api';

export interface UseExoplanetsReturn {
  exoplanets: ExoplanetData[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useExoplanets = (): UseExoplanetsReturn => {
  const [exoplanets, setExoplanets] = useState<ExoplanetData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExoplanets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getExoplanets();
      setExoplanets(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load exoplanets';
      setError(errorMessage);
      console.error('Error fetching exoplanets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExoplanets();
  }, []);

  return {
    exoplanets,
    loading,
    error,
    refetch: fetchExoplanets,
  };
};

export interface UseExoplanetReturn {
  exoplanet: ExoplanetData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useExoplanet = (id: string): UseExoplanetReturn => {
  const [exoplanet, setExoplanet] = useState<ExoplanetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExoplanet = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getExoplanetById(id);
      setExoplanet(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load exoplanet';
      setError(errorMessage);
      console.error('Error fetching exoplanet:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExoplanet();
  }, [id]);

  return {
    exoplanet,
    loading,
    error,
    refetch: fetchExoplanet,
  };
};

export interface UseExoplanetSearchReturn {
  searchResults: ExoplanetData[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

export const useExoplanetSearch = (): UseExoplanetSearchReturn => {
  const [searchResults, setSearchResults] = useState<ExoplanetData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.searchExoplanets(query);
      setSearchResults(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search exoplanets';
      setError(errorMessage);
      console.error('Error searching exoplanets:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchResults,
    loading,
    error,
    search,
  };
};
