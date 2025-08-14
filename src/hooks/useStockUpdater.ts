import { useState, useEffect, useCallback, useRef } from 'react';
import { FruitItem, StockUpdate, UpdateConfig, NetworkStatus } from '@/types';

export interface UseStockUpdaterOptions {
  initialData: FruitItem[];
  refreshInterval?: number;
  enableAutoRefresh?: boolean;
  onDataUpdate?: (updates: StockUpdate[]) => void;
  onError?: (error: Error) => void;
}

export interface UseStockUpdaterReturn {
  data: FruitItem[];
  isRefreshing: boolean;
  lastRefresh: Date | null;
  nextRefresh: Date | null;
  networkStatus: NetworkStatus;
  refresh: () => Promise<void>;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
  updateConfig: (config: Partial<UpdateConfig>) => void;
  config: UpdateConfig;
}

export function useStockUpdater({
  initialData,
  refreshInterval = 30000, // 30 seconds default
  enableAutoRefresh = true,
  onDataUpdate,
  onError
}: UseStockUpdaterOptions): UseStockUpdaterReturn {
  const [data, setData] = useState<FruitItem[]>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [nextRefresh, setNextRefresh] = useState<Date | null>(null);
  const [config, setConfig] = useState<UpdateConfig>({
    autoRefresh: enableAutoRefresh,
    refreshInterval,
    enableNotifications: true,
    enableSound: false,
    retryOnFailure: true
  });

  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    lastSeen: new Date(),
    retryCount: 0,
    maxRetries: 3
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Simulate API call for demo purposes
  const fetchStockData = useCallback(async (): Promise<FruitItem[]> => {
    // In a real app, this would be an actual API call
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate some random changes to make it interesting
    return initialData.map(fruit => {
      if (Math.random() > 0.7) {
        const stockChange = Math.floor(Math.random() * 10) - 5; // -5 to +5
        const priceChange = Math.floor(Math.random() * 100) - 50; // -50 to +50
        
        return {
          ...fruit,
          stock: Math.max(0, fruit.stock + stockChange),
          price: Math.max(1, fruit.price + priceChange),
          lastUpdated: new Date().toISOString()
        };
      }
      return fruit;
    });
  }, [initialData]);

  // Detect stock changes and create updates
  const detectChanges = useCallback((oldData: FruitItem[], newData: FruitItem[]): StockUpdate[] => {
    const updates: StockUpdate[] = [];
    
    newData.forEach((newFruit, index) => {
      const oldFruit = oldData[index];
      if (!oldFruit) return;

      const changes: Partial<FruitItem> = {};
      let hasChanges = false;

      if (oldFruit.stock !== newFruit.stock) {
        changes.stock = newFruit.stock;
        hasChanges = true;
      }

      if (oldFruit.price !== newFruit.price) {
        changes.price = newFruit.price;
        hasChanges = true;
      }

      if (oldFruit.status !== newFruit.status) {
        changes.status = newFruit.status;
        hasChanges = true;
      }

      if (hasChanges) {
        updates.push({
          fruitId: newFruit.id,
          changes,
          timestamp: new Date(),
          source: 'api'
        });
      }
    });

    return updates;
  }, []);

  // Main refresh function
  const refresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setNetworkStatus(prev => ({ ...prev, retryCount: 0 }));

    try {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const newData = await fetchStockData();
      
      // Detect changes
      const updates = detectChanges(data, newData);
      
      // Update data
      setData(newData);
      setLastRefresh(new Date());
      setNextRefresh(new Date(Date.now() + config.refreshInterval));
      
      // Notify about updates
      if (updates.length > 0 && onDataUpdate) {
        onDataUpdate(updates);
      }

      // Reset retry count on success
      setNetworkStatus(prev => ({ ...prev, retryCount: 0 }));

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Request was cancelled
      }

      console.error('Failed to refresh stock data:', error);
      
      if (onError) {
        onError(error as Error);
      }

      // Handle retry logic
      if (config.retryOnFailure && networkStatus.retryCount < networkStatus.maxRetries) {
        setNetworkStatus(prev => ({ 
          ...prev, 
          retryCount: prev.retryCount + 1 
        }));
        
        // Retry after a delay
        setTimeout(() => {
          if (config.autoRefresh) {
            refresh();
          }
        }, 5000 * (networkStatus.retryCount + 1)); // Exponential backoff
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, data, config, networkStatus, fetchStockData, detectChanges, onDataUpdate, onError]);

  // Start auto-refresh
  const startAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setConfig(prev => ({ ...prev, autoRefresh: true }));
    
    intervalRef.current = setInterval(() => {
      if (config.autoRefresh) {
        refresh();
      }
    }, config.refreshInterval);

    // Set next refresh time
    setNextRefresh(new Date(Date.now() + config.refreshInterval));
  }, [config.autoRefresh, config.refreshInterval, refresh]);

  // Stop auto-refresh
  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setConfig(prev => ({ ...prev, autoRefresh: false }));
    setNextRefresh(null);
  }, []);

  // Update configuration
  const updateConfig = useCallback((newConfig: Partial<UpdateConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Restart interval if refresh interval changed
      if (newConfig.refreshInterval && intervalRef.current) {
        clearInterval(intervalRef.current);
        if (updated.autoRefresh) {
          intervalRef.current = setInterval(() => {
            if (updated.autoRefresh) {
              refresh();
            }
          }, updated.refreshInterval);
        }
      }
      
      return updated;
    });
  }, [refresh]);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(prev => ({ 
        ...prev, 
        isOnline: true, 
        lastSeen: new Date() 
      }));
      
      // Refresh data when coming back online
      if (config.autoRefresh) {
        refresh();
      }
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({ 
        ...prev, 
        isOnline: false, 
        lastSeen: new Date() 
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [config.autoRefresh, refresh]);

  // Auto-refresh setup
  useEffect(() => {
    if (config.autoRefresh) {
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [config.autoRefresh, startAutoRefresh, stopAutoRefresh]);

  // Initial refresh
  useEffect(() => {
    if (enableAutoRefresh) {
      refresh();
    }
  }, []); // Only run once on mount

  return {
    data,
    isRefreshing,
    lastRefresh,
    nextRefresh,
    networkStatus,
    refresh,
    startAutoRefresh,
    stopAutoRefresh,
    updateConfig,
    config
  };
}
