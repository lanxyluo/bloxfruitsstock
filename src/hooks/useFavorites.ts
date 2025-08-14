import { useState, useEffect, useCallback } from 'react';
import { FavoriteItem, FruitItem } from '@/types';

const FAVORITES_STORAGE_KEY = 'bloxfruits-favorites';
const PRICE_ALERTS_STORAGE_KEY = 'bloxfruits-price-alerts';

export interface UseFavoritesOptions {
  enableLocalStorage?: boolean;
  maxFavorites?: number;
}

export interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  addToFavorites: (fruit: FruitItem, notes?: string) => void;
  removeFromFavorites: (fruitId: string) => void;
  isFavorite: (fruitId: string) => boolean;
  updateFavoriteNotes: (fruitId: string, notes: string) => void;
  setPriceAlert: (fruitId: string, price: number) => void;
  removePriceAlert: (fruitId: string) => void;
  getPriceAlert: (fruitId: string) => number | null;
  clearAllFavorites: () => void;
  exportFavorites: () => string;
  importFavorites: (data: string) => boolean;
  favoritesCount: number;
}

export function useFavorites({
  enableLocalStorage = true,
  maxFavorites = 50
}: UseFavoritesOptions = {}): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (enableLocalStorage) {
      try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Ensure all dates are properly parsed
          const favoritesWithDates = parsed.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          setFavorites(favoritesWithDates);
        }
      } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
      }
    }
  }, [enableLocalStorage]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (enableLocalStorage && favorites.length > 0) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage:', error);
      }
    }
  }, [favorites, enableLocalStorage]);

  // Add fruit to favorites
  const addToFavorites = useCallback((fruit: FruitItem, notes?: string) => {
    if (favorites.length >= maxFavorites) {
      throw new Error(`Maximum favorites limit reached (${maxFavorites})`);
    }

    // Check if already in favorites directly
    if (favorites.some(fav => fav.fruitId === fruit.id)) {
      throw new Error('Fruit is already in favorites');
    }

    const newFavorite: FavoriteItem = {
      id: `favorite-${Date.now()}-${Math.random()}`,
      fruitId: fruit.id,
      fruitName: fruit.name,
      addedAt: new Date(),
      notes: notes || ''
    };

    setFavorites(prev => [...prev, newFavorite]);
  }, [favorites, maxFavorites]);

  // Remove fruit from favorites
  const removeFromFavorites = useCallback((fruitId: string) => {
    setFavorites(prev => prev.filter(fav => fav.fruitId !== fruitId));
  }, []);

  // Check if fruit is in favorites
  const isFavorite = useCallback((fruitId: string) => {
    return favorites.some(fav => fav.fruitId === fruitId);
  }, [favorites]);

  // Update favorite notes
  const updateFavoriteNotes = useCallback((fruitId: string, notes: string) => {
    setFavorites(prev => 
      prev.map(fav => 
        fav.fruitId === fruitId ? { ...fav, notes } : fav
      )
    );
  }, []);

  // Set price alert for a favorite
  const setPriceAlert = useCallback((fruitId: string, price: number) => {
    setFavorites(prev => 
      prev.map(fav => 
        fav.fruitId === fruitId ? { ...fav, priceAlert: price } : fav
      )
    );

    // Also save to separate storage for easier access
    if (enableLocalStorage) {
      try {
        const alerts = JSON.parse(localStorage.getItem(PRICE_ALERTS_STORAGE_KEY) || '{}');
        alerts[fruitId] = price;
        localStorage.setItem(PRICE_ALERTS_STORAGE_KEY, JSON.stringify(alerts));
      } catch (error) {
        console.error('Failed to save price alert:', error);
      }
    }
  }, [enableLocalStorage]);

  // Remove price alert
  const removePriceAlert = useCallback((fruitId: string) => {
    setFavorites(prev => 
      prev.map(fav => 
        fav.fruitId === fruitId ? { ...fav, priceAlert: undefined } : fav
      )
    );

    // Remove from separate storage
    if (enableLocalStorage) {
      try {
        const alerts = JSON.parse(localStorage.getItem(PRICE_ALERTS_STORAGE_KEY) || '{}');
        delete alerts[fruitId];
        localStorage.setItem(PRICE_ALERTS_STORAGE_KEY, JSON.stringify(alerts));
      } catch (error) {
        console.error('Failed to remove price alert:', error);
      }
    }
  }, [enableLocalStorage]);

  // Get price alert for a fruit
  const getPriceAlert = useCallback((fruitId: string) => {
    const favorite = favorites.find(fav => fav.fruitId === fruitId);
    return favorite?.priceAlert || null;
  }, [favorites]);

  // Clear all favorites
  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
    if (enableLocalStorage) {
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      localStorage.removeItem(PRICE_ALERTS_STORAGE_KEY);
    }
  }, [enableLocalStorage]);

  // Export favorites to JSON string
  const exportFavorites = useCallback(() => {
    return JSON.stringify(favorites, null, 2);
  }, [favorites]);

  // Import favorites from JSON string
  const importFavorites = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Validate the structure
        const isValid = parsed.every(item => 
          item.fruitId && 
          item.fruitName && 
          item.addedAt
        );

        if (isValid) {
          const favoritesWithDates = parsed.map((item: any) => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          setFavorites(favoritesWithDates);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to import favorites:', error);
      return false;
    }
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    updateFavoriteNotes,
    setPriceAlert,
    removePriceAlert,
    getPriceAlert,
    clearAllFavorites,
    exportFavorites,
    importFavorites,
    favoritesCount: favorites.length
  };
}
