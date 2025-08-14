// Stock Status Enum
export enum StockStatus {
  IN_STOCK = 'in-stock',
  OUT_OF_STOCK = 'out-of-stock',
  LOW_STOCK = 'low-stock',
  COMING_SOON = 'coming-soon'
}

// Rarity Level Enum
export enum RarityLevel {
  COMMON = 'Common',
  UNCOMMON = 'Uncommon',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
  MYTHICAL = 'Mythical'
}

// Fruit Item Interface
export interface FruitItem {
  id: string;
  name: string;
  displayName: string;
  rarity: RarityLevel;
  price: number;
  stock: number;
  status: StockStatus;
  icon: string;
  description: string;
  lastUpdated: string;
  category: 'Fruit' | 'Gamepass' | 'Limited';
  tradeable: boolean;
  demand: 'Low' | 'Medium' | 'High' | 'Very High';
  supply: 'Low' | 'Medium' | 'High' | 'Very High';
}

// Market Stats Interface
export interface MarketStats {
  totalFruits: number;
  inStock: number;
  outOfStock: number;
  lowStock: number;
  comingSoon: number;
  averagePrice: number;
  totalValue: number;
  lastUpdate: string;
  marketTrend: 'up' | 'down' | 'stable';
}

// API Response Interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface StockResponse extends ApiResponse<FruitItem[]> {}
export interface FruitsResponse extends ApiResponse<FruitItem[]> {}
export interface StatsResponse extends ApiResponse<MarketStats> {}

// Filter and Search Interfaces
export interface FilterOptions {
  rarity?: RarityLevel;
  status?: StockStatus;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  searchTerm?: string;
}

export interface SortOptions {
  field: 'name' | 'price' | 'stock' | 'rarity' | 'lastUpdated';
  direction: 'asc' | 'desc';
}

// Pagination Interface
export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: PaginationOptions;
}

// Trade History Interface
export interface TradeHistory {
  id: string;
  fruitId: string;
  fruitName: string;
  price: number;
  quantity: number;
  type: 'buy' | 'sell';
  timestamp: string;
  userId?: string;
}

// Alert Interface
export interface StockAlert {
  id: string;
  fruitId: string;
  fruitName: string;
  type: 'price_drop' | 'stock_available' | 'price_increase';
  threshold: number;
  currentValue: number;
  isActive: boolean;
  createdAt: string;
  userId?: string;
}

// User Preferences Interface
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  currency: 'USD' | 'EUR' | 'GBP';
  notifications: {
    priceAlerts: boolean;
    stockAlerts: boolean;
    marketUpdates: boolean;
  };
  defaultSort: SortOptions;
  itemsPerPage: number;
}

// Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Utility Types
export type RarityColor = {
  [key in RarityLevel]: {
    primary: string;
    secondary: string;
    background: string;
  };
};

export type StatusColor = {
  [key in StockStatus]: {
    primary: string;
    secondary: string;
    background: string;
  };
};

// Notification System Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface StockChangeNotification extends Notification {
  fruitId: string;
  fruitName: string;
  changeType: 'stock_increase' | 'stock_decrease' | 'price_change' | 'status_change';
  oldValue: any;
  newValue: any;
}

// Favorites System Types
export interface FavoriteItem {
  id: string;
  fruitId: string;
  fruitName: string;
  addedAt: Date;
  notes?: string;
  priceAlert?: number;
}

// Stock History Types
export interface StockHistoryEntry {
  id: string;
  fruitId: string;
  fruitName: string;
  timestamp: Date;
  stock: number;
  price: number;
  status: StockStatus;
  changeType: 'stock_update' | 'price_update' | 'status_update';
}

// Price Trend Types
export interface PriceTrend {
  fruitId: string;
  fruitName: string;
  data: Array<{
    timestamp: Date;
    price: number;
    stock: number;
  }>;
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
  period: '1h' | '24h' | '7d' | '30d';
}

// Advanced Filter Types
export interface AdvancedFilters {
  priceRange: [number, number];
  rarities: RarityLevel[];
  statuses: StockStatus[];
  categories: string[];
  tradeable: boolean | null;
  demand: string[];
  supply: string[];
  customFilters: {
    [key: string]: any;
  };
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: AdvancedFilters;
  createdAt: Date;
  isDefault: boolean;
}

// Performance and Cache Types
export interface CacheEntry<T> {
  data: T;
  timestamp: Date;
  ttl: number;
}

export interface VirtualScrollConfig {
  itemHeight: number;
  overscan: number;
  containerHeight: number;
}

// Error Handling Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export interface NetworkStatus {
  isOnline: boolean;
  lastSeen: Date;
  retryCount: number;
  maxRetries: number;
}

// Real-time Update Types
export interface StockUpdate {
  fruitId: string;
  changes: Partial<FruitItem>;
  timestamp: Date;
  source: 'api' | 'websocket' | 'manual';
}

export interface UpdateConfig {
  autoRefresh: boolean;
  refreshInterval: number; // in milliseconds
  enableNotifications: boolean;
  enableSound: boolean;
  retryOnFailure: boolean;
}
