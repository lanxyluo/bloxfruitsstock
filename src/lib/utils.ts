import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RarityLevel, StockStatus, FruitItem } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Price formatting utilities
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatCompactPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  }
  if (price >= 1000) {
    return `$${(price / 1000).toFixed(1)}K`
  }
  return `$${price}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Rarity color utilities
export function getRarityColor(rarity: RarityLevel): string {
  switch (rarity) {
    case RarityLevel.COMMON:
      return 'text-muted-foreground' // 中性灰
    case RarityLevel.UNCOMMON:
      return 'text-primary' // 现代蓝
    case RarityLevel.RARE:
      return 'text-primary' // 现代蓝
    case RarityLevel.EPIC:
      return 'text-purple-500' // 现代紫
    case RarityLevel.LEGENDARY:
      return 'text-warning' // 现代橙
    case RarityLevel.MYTHICAL:
      return 'text-destructive' // 现代红
    default:
      return 'text-muted-foreground'
  }
}

export function getRarityBgColor(rarity: RarityLevel): string {
  switch (rarity) {
    case RarityLevel.COMMON:
      return 'rarity-common'
    case RarityLevel.UNCOMMON:
      return 'rarity-rare'
    case RarityLevel.RARE:
      return 'rarity-rare'
    case RarityLevel.EPIC:
      return 'rarity-epic'
    case RarityLevel.LEGENDARY:
      return 'rarity-legendary'
    case RarityLevel.MYTHICAL:
      return 'rarity-mythical'
    default:
      return 'bg-muted'
  }
}

export function getRarityCardClass(rarity: RarityLevel): string {
  switch (rarity) {
    case RarityLevel.COMMON:
      return 'card-common'
    case RarityLevel.UNCOMMON:
      return 'card-rare'
    case RarityLevel.RARE:
      return 'card-rare'
    case RarityLevel.EPIC:
      return 'card-epic'
    case RarityLevel.LEGENDARY:
      return 'card-legendary'
    case RarityLevel.MYTHICAL:
      return 'card-mythical'
    default:
      return ''
  }
}

// Status color utilities
export function getStatusColor(status: StockStatus): string {
  switch (status) {
    case StockStatus.IN_STOCK:
      return 'text-success' // #22c55e - 现代绿色
    case StockStatus.OUT_OF_STOCK:
      return 'text-destructive' // #ef4444 - 红色
    case StockStatus.LOW_STOCK:
      return 'text-warning' // #f59e0b - 橙色
    case StockStatus.COMING_SOON:
      return 'text-primary' // #3b82f6 - 蓝色
    default:
      return 'text-muted-foreground'
  }
}

export function getStatusBgColor(status: StockStatus): string {
  switch (status) {
    case StockStatus.IN_STOCK:
      return 'status-in-stock'
    case StockStatus.OUT_OF_STOCK:
      return 'status-out-of-stock'
    case StockStatus.LOW_STOCK:
      return 'status-low-stock'
    case StockStatus.COMING_SOON:
      return 'status-coming-soon'
    default:
      return 'bg-muted'
  }
}

// Stock utilities
export function getStockStatus(stock: number): StockStatus {
  if (stock === 0) {
    return StockStatus.OUT_OF_STOCK
  } else if (stock <= 5) {
    return StockStatus.LOW_STOCK
  } else {
    return StockStatus.IN_STOCK
  }
}

export function getStockStatusText(status: StockStatus): string {
  switch (status) {
    case StockStatus.IN_STOCK:
      return 'In Stock'
    case StockStatus.OUT_OF_STOCK:
      return 'Out of Stock'
    case StockStatus.LOW_STOCK:
      return 'Low Stock'
    case StockStatus.COMING_SOON:
      return 'Coming Soon'
    default:
      return 'Unknown'
  }
}

export function getStockStatusIcon(status: StockStatus): string {
  switch (status) {
    case StockStatus.IN_STOCK:
      return '✅'
    case StockStatus.OUT_OF_STOCK:
      return '❌'
    case StockStatus.LOW_STOCK:
      return '⚠️'
    case StockStatus.COMING_SOON:
      return '🕐'
    default:
      return '❓'
  }
}

// Date and time utilities
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const d = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'Just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

// Search and filter utilities
export function filterFruits(
  fruits: FruitItem[],
  filters: {
    searchTerm?: string
    rarity?: RarityLevel
    status?: StockStatus
    category?: string
    priceRange?: { min: number; max: number }
  }
): FruitItem[] {
  return fruits.filter(fruit => {
    // Search term filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      const matchesSearch = 
        fruit.displayName.toLowerCase().includes(searchTerm) ||
        fruit.description.toLowerCase().includes(searchTerm)
      if (!matchesSearch) return false
    }

    // Rarity filter
    if (filters.rarity && fruit.rarity !== filters.rarity) {
      return false
    }

    // Status filter
    if (filters.status && fruit.status !== filters.status) {
      return false
    }

    // Category filter
    if (filters.category && fruit.category !== filters.category) {
      return false
    }

    // Price range filter
    if (filters.priceRange) {
      const { min, max } = filters.priceRange
      if (fruit.price < min || fruit.price > max) {
        return false
      }
    }

    return true
  })
}

export function sortFruits(
  fruits: FruitItem[],
  sortBy: 'name' | 'price' | 'stock' | 'rarity' | 'lastUpdated',
  direction: 'asc' | 'desc' = 'asc'
): FruitItem[] {
  const sorted = [...fruits].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'name':
        comparison = a.displayName.localeCompare(b.displayName)
        break
      case 'price':
        comparison = a.price - b.price
        break
      case 'stock':
        comparison = a.stock - b.stock
        break
      case 'rarity':
        const rarityOrder = {
          [RarityLevel.COMMON]: 0,
          [RarityLevel.UNCOMMON]: 1,
          [RarityLevel.RARE]: 2,
          [RarityLevel.EPIC]: 3,
          [RarityLevel.LEGENDARY]: 4,
          [RarityLevel.MYTHICAL]: 5
        }
        comparison = rarityOrder[a.rarity] - rarityOrder[b.rarity]
        break
      case 'lastUpdated':
        comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        break
    }

    return direction === 'asc' ? comparison : -comparison
  })

  return sorted
}

// Market analysis utilities
export function calculateMarketStats(fruits: FruitItem[]) {
  const totalFruits = fruits.length
  const inStock = fruits.filter(f => f.status === StockStatus.IN_STOCK).length
  const outOfStock = fruits.filter(f => f.status === StockStatus.OUT_OF_STOCK).length
  const lowStock = fruits.filter(f => f.status === StockStatus.LOW_STOCK).length
  const comingSoon = fruits.filter(f => f.status === StockStatus.COMING_SOON).length
  
  const totalValue = fruits.reduce((sum, fruit) => sum + (fruit.price * fruit.stock), 0)
  const averagePrice = fruits.length > 0 ? fruits.reduce((sum, fruit) => sum + fruit.price, 0) / fruits.length : 0

  return {
    totalFruits,
    inStock,
    outOfStock,
    lowStock,
    comingSoon,
    totalValue,
    averagePrice,
    lastUpdate: new Date().toISOString(),
    marketTrend: 'stable' as const
  }
}

// Validation utilities
export function isValidPrice(price: number): boolean {
  return price >= 0 && Number.isFinite(price)
}

export function isValidStock(stock: number): boolean {
  return stock >= 0 && Number.isInteger(stock)
}

export function isValidRarity(rarity: string): rarity is RarityLevel {
  return Object.values(RarityLevel).includes(rarity as RarityLevel)
}

export function isValidStatus(status: string): status is StockStatus {
  return Object.values(StockStatus).includes(status as StockStatus)
}
