import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export function getStatusColor(status: 'in-stock' | 'out-of-stock' | 'low-stock'): string {
  switch (status) {
    case 'in-stock':
      return 'text-success' // #22c55e - 现代绿色
    case 'out-of-stock':
      return 'text-destructive' // #ef4444 - 红色
    case 'low-stock':
      return 'text-warning' // #f59e0b - 橙色
    default:
      return 'text-muted-foreground'
  }
}

export function getStatusBgColor(status: 'in-stock' | 'out-of-stock' | 'low-stock'): string {
  switch (status) {
    case 'in-stock':
      return 'status-in-stock'
    case 'out-of-stock':
      return 'status-out-of-stock'
    case 'low-stock':
      return 'status-low-stock'
    default:
      return 'bg-muted'
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'Common':
      return 'text-muted-foreground' // 中性灰
    case 'Uncommon':
      return 'text-primary' // 现代蓝
    case 'Rare':
      return 'text-primary' // 现代蓝
    case 'Epic':
      return 'text-purple-500' // 现代紫
    case 'Legendary':
      return 'text-warning' // 现代橙
    case 'Mythical':
      return 'text-destructive' // 现代红
    default:
      return 'text-muted-foreground'
  }
}

export function getRarityBgColor(rarity: string): string {
  switch (rarity) {
    case 'Common':
      return 'rarity-common'
    case 'Uncommon':
      return 'rarity-rare'
    case 'Rare':
      return 'rarity-rare'
    case 'Epic':
      return 'rarity-epic'
    case 'Legendary':
      return 'rarity-legendary'
    case 'Mythical':
      return 'rarity-mythical'
    default:
      return 'bg-muted'
  }
}

export function getRarityCardClass(rarity: string): string {
  switch (rarity) {
    case 'Common':
      return 'card-common'
    case 'Uncommon':
      return 'card-rare'
    case 'Rare':
      return 'card-rare'
    case 'Epic':
      return 'card-epic'
    case 'Legendary':
      return 'card-legendary'
    case 'Mythical':
      return 'card-mythical'
    default:
      return ''
  }
}
