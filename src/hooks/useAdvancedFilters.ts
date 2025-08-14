import { useState, useEffect, useCallback, useMemo } from 'react';
import { AdvancedFilters, SavedFilter, FruitItem, RarityLevel, StockStatus } from '@/types';

const SAVED_FILTERS_STORAGE_KEY = 'bloxfruits-saved-filters';

export interface UseAdvancedFiltersOptions {
  enableLocalStorage?: boolean;
  maxSavedFilters?: number;
}

export interface UseAdvancedFiltersReturn {
  filters: AdvancedFilters;
  updateFilters: (updates: Partial<AdvancedFilters>) => void;
  resetFilters: () => void;
  savedFilters: SavedFilter[];
  saveCurrentFilter: (name: string) => void;
  loadFilter: (filterId: string) => void;
  deleteFilter: (filterId: string) => void;
  setDefaultFilter: (filterId: string) => void;
  exportFilters: () => string;
  importFilters: (data: string) => boolean;
  filteredItems: FruitItem[];
  activeFiltersCount: number;
  hasActiveFilters: boolean;
}

const defaultFilters: AdvancedFilters = {
  priceRange: [0, 10000],
  rarities: [],
  statuses: [],
  categories: [],
  tradeable: null,
  demand: [],
  supply: [],
  customFilters: {}
};

export function useAdvancedFilters(
  items: FruitItem[],
  options: UseAdvancedFiltersOptions = {}
): UseAdvancedFiltersReturn {
  const { enableLocalStorage = true, maxSavedFilters = 10 } = options;
  
  const [filters, setFilters] = useState<AdvancedFilters>(defaultFilters);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

  // Load saved filters from localStorage on mount
  useEffect(() => {
    if (enableLocalStorage) {
      try {
        const stored = localStorage.getItem(SAVED_FILTERS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const filtersWithDates = parsed.map((filter: any) => ({
            ...filter,
            createdAt: new Date(filter.createdAt)
          }));
          setSavedFilters(filtersWithDates);
          
          // Load default filter if exists
          const defaultFilter = filtersWithDates.find((f: any) => f.isDefault);
          if (defaultFilter) {
            setFilters(defaultFilter.filters);
          }
        }
      } catch (error) {
        console.error('Failed to load saved filters from localStorage:', error);
      }
    }
  }, [enableLocalStorage]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (enableLocalStorage) {
      try {
        localStorage.setItem(SAVED_FILTERS_STORAGE_KEY, JSON.stringify(savedFilters));
      } catch (error) {
        console.error('Failed to save filters to localStorage:', error);
      }
    }
  }, [savedFilters, enableLocalStorage]);

  // Update filters
  const updateFilters = useCallback((updates: Partial<AdvancedFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Save current filter
  const saveCurrentFilter = useCallback((name: string) => {
    if (savedFilters.length >= maxSavedFilters) {
      throw new Error(`Maximum saved filters limit reached (${maxSavedFilters})`);
    }

    const newFilter: SavedFilter = {
      id: `filter-${Date.now()}-${Math.random()}`,
      name,
      filters: { ...filters },
      createdAt: new Date(),
      isDefault: false
    };

    setSavedFilters(prev => [...prev, newFilter]);
  }, [filters, savedFilters.length, maxSavedFilters]);

  // Load a saved filter
  const loadFilter = useCallback((filterId: string) => {
    const filter = savedFilters.find(f => f.id === filterId);
    if (filter) {
      setFilters(filter.filters);
    }
  }, [savedFilters]);

  // Delete a saved filter
  const deleteFilter = useCallback((filterId: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== filterId));
  }, []);

  // Set a filter as default
  const setDefaultFilter = useCallback((filterId: string) => {
    setSavedFilters(prev => 
      prev.map(f => ({ ...f, isDefault: f.id === filterId }))
    );
  }, []);

  // Export filters to JSON string
  const exportFilters = useCallback(() => {
    return JSON.stringify(savedFilters, null, 2);
  }, [savedFilters]);

  // Import filters from JSON string
  const importFilters = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        // Validate the structure
        const isValid = parsed.every(filter => 
          filter.name && 
          filter.filters && 
          filter.createdAt
        );

        if (isValid) {
          const filtersWithDates = parsed.map((filter: any) => ({
            ...filter,
            createdAt: new Date(filter.createdAt)
          }));
          setSavedFilters(filtersWithDates);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Failed to import filters:', error);
      return false;
    }
  }, []);

  // Apply filters to items
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Price range filter
      if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
        return false;
      }

      // Rarity filter
      if (filters.rarities.length > 0 && !filters.rarities.includes(item.rarity)) {
        return false;
      }

      // Status filter
      if (filters.statuses.length > 0 && !filters.statuses.includes(item.status)) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }

      // Tradeable filter
      if (filters.tradeable !== null && item.tradeable !== filters.tradeable) {
        return false;
      }

      // Demand filter
      if (filters.demand.length > 0 && !filters.demand.includes(item.demand)) {
        return false;
      }

      // Supply filter
      if (filters.supply.length > 0 && !filters.supply.includes(item.supply)) {
        return false;
      }

      // Custom filters
      for (const [key, value] of Object.entries(filters.customFilters)) {
        if (item[key as keyof FruitItem] !== value) {
          return false;
        }
      }

      return true;
    });
  }, [items, filters]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) count++;
    if (filters.rarities.length > 0) count++;
    if (filters.statuses.length > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.tradeable !== null) count++;
    if (filters.demand.length > 0) count++;
    if (filters.supply.length > 0) count++;
    count += Object.keys(filters.customFilters).length;
    
    return count;
  }, [filters]);

  // Check if any filters are active
  const hasActiveFilters = activeFiltersCount > 0;

  return {
    filters,
    updateFilters,
    resetFilters,
    savedFilters,
    saveCurrentFilter,
    loadFilter,
    deleteFilter,
    setDefaultFilter,
    exportFilters,
    importFilters,
    filteredItems,
    activeFiltersCount,
    hasActiveFilters
  };
}
