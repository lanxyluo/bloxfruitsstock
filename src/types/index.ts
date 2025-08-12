export interface BloxFruit {
  id: string
  name: string
  displayName: string
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical'
  price: number
  stock: number
  status: 'in-stock' | 'out-of-stock' | 'low-stock'
  lastUpdated: string
  imageUrl?: string
  description?: string
}

export interface MarketStats {
  totalFruits: number
  inStock: number
  outOfStock: number
  lowStock: number
  averagePrice: number
  totalValue: number
  lastUpdate: string
}

export interface StockAlert {
  id: string
  fruitId: string
  fruitName: string
  type: 'restock' | 'price-drop' | 'price-increase'
  message: string
  timestamp: string
  read: boolean
}

export interface UserSettings {
  notifications: {
    email: boolean
    browser: boolean
    discord: boolean
  }
  alerts: {
    restock: boolean
    priceDrop: boolean
    priceIncrease: boolean
  }
  theme: 'dark' | 'light' | 'system'
  currency: 'USD' | 'EUR' | 'GBP'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
