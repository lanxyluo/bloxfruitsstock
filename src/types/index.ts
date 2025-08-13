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
