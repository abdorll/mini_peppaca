import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FavoritesContextType } from '../types';
import { addToFavorites as addToFavoritesApi, removeFromFavorites as removeFromFavoritesApi, fetchUserFavorites } from '../data/favoritesApi';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshFavorites();
  }, []);

  const refreshFavorites = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userFavorites = await fetchUserFavorites();
      setFavorites(userFavorites);
      console.log('✅ Favorites loaded:', userFavorites);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load favorites');
      console.error('Failed to load favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    setFavorites(prev => [...prev, productId]);
    setError(null);

    try {
      await addToFavoritesApi(productId);
      console.log('✅ Successfully added to favorites');
    } catch (err) {
      setFavorites(prev => prev.filter(id => id !== productId));
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to favorites';
      setError(errorMessage);
      console.error('Failed to add to favorites:', err);
      throw err;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    setFavorites(prev => prev.filter(id => id !== productId));
    setError(null);

    try {
      await removeFromFavoritesApi(productId);
      console.log('✅ Successfully removed from favorites');
    } catch (err) {
      setFavorites(prev => [...prev, productId]);
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from favorites';
      setError(errorMessage);
      console.error('Failed to remove from favorites:', err);
      throw err;
    }
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      isLoading,
      error,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      refreshFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};