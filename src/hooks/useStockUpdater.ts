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
  const [config, setConfig] = useState<UpdateConfig>(() => ({
    autoRefresh: enableAutoRefresh,
    refreshInterval,
    enableNotifications: true,
    enableSound: false,
    retryOnFailure: true
  }));

  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(() => ({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastSeen: new Date(),
    retryCount: 0,
    maxRetries: 3
  }));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const dataRef = useRef<FruitItem[]>(initialData);
  const configRef = useRef<UpdateConfig>({
    autoRefresh: enableAutoRefresh,
    refreshInterval,
    enableNotifications: true,
    enableSound: false,
    retryOnFailure: true
  });
  const networkStatusRef = useRef<NetworkStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastSeen: new Date(),
    retryCount: 0,
    maxRetries: 3
  });

  // Keep refs in sync with state
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    networkStatusRef.current = networkStatus;
  }, [networkStatus]);

  // Simulate API call for demo purposes - stable function reference
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

  // Detect stock changes and create updates - stable function reference
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

  // Main refresh function - stable function reference with proper error handling
  const refresh = useCallback(async () => {
    // Use refs to check current state without dependencies
    if (isRefreshing || networkStatusRef.current.retryCount >= networkStatusRef.current.maxRetries) {
      return;
    }

    setIsRefreshing(true);
    setNetworkStatus(prev => ({ ...prev, retryCount: 0 }));

    try {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const newData = await fetchStockData();
      
      // Detect changes using refs to avoid dependency issues
      const updates = detectChanges(dataRef.current, newData);
      
      // Update data
      setData(newData);
      setLastRefresh(new Date());
      setNextRefresh(new Date(Date.now() + configRef.current.refreshInterval));
      
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

      // Handle retry logic - use refs to avoid dependency issues
      const currentRetryCount = networkStatusRef.current.retryCount;
      const maxRetries = networkStatusRef.current.maxRetries;
      
      if (configRef.current.retryOnFailure && currentRetryCount < maxRetries) {
        setNetworkStatus(prev => ({ 
          ...prev, 
          retryCount: prev.retryCount + 1 
        }));
        
        // Retry after a delay - use setTimeout to avoid immediate recursion
        setTimeout(() => {
          // Check if we should still retry (avoid race conditions)
          if (configRef.current.autoRefresh && !isRefreshing) {
            refresh();
          }
        }, 5000 * (currentRetryCount + 1)); // Exponential backoff
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchStockData, detectChanges, onDataUpdate, onError]); // Remove isRefreshing dependency

  // Start auto-refresh - stable function reference
  const startAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setConfig(prev => ({ ...prev, autoRefresh: true }));
    
    intervalRef.current = setInterval(() => {
      // Use refs to check current state without dependencies
      if (configRef.current.autoRefresh && !isRefreshing) {
        refresh();
      }
    }, configRef.current.refreshInterval);

    // Set next refresh time
    setNextRefresh(new Date(Date.now() + configRef.current.refreshInterval));
  }, [refresh]); // Remove isRefreshing dependency

  // Stop auto-refresh - stable function reference
  const stopAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setConfig(prev => ({ ...prev, autoRefresh: false }));
    setNextRefresh(null);
  }, []);

  // Update configuration - stable function reference
  const updateConfig = useCallback((newConfig: Partial<UpdateConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Restart interval if refresh interval changed
      if (newConfig.refreshInterval && intervalRef.current) {
        clearInterval(intervalRef.current);
        if (updated.autoRefresh) {
          intervalRef.current = setInterval(() => {
            // Use refs to check current state without dependencies
            if (updated.autoRefresh && !isRefreshing) {
              refresh();
            }
          }, updated.refreshInterval);
        }
      }
      
      return updated;
    });
  }, [refresh]); // Remove isRefreshing dependency

  // Network status monitoring - stable function reference
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(prev => ({ 
        ...prev, 
        isOnline: true, 
        lastSeen: new Date() 
      }));
      
      // Refresh data when coming back online - use refs to avoid dependencies
      if (configRef.current.autoRefresh && !isRefreshing) {
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
  }, [refresh]); // Remove isRefreshing dependency

  // Auto-refresh setup - stable dependencies
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

  // Initial refresh - stable dependencies
  useEffect(() => {
    if (enableAutoRefresh) {
      refresh();
    }
  }, [enableAutoRefresh, refresh]); // Remove isRefreshing dependency

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
