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
      return 'text-success'
    case 'out-of-stock':
      return 'text-destructive'
    case 'low-stock':
      return 'text-yellow-500'
    default:
      return 'text-muted-foreground'
  }
}

export function getStatusBgColor(status: 'in-stock' | 'out-of-stock' | 'low-stock'): string {
  switch (status) {
    case 'in-stock':
      return 'bg-success/10 border-success/20'
    case 'out-of-stock':
      return 'bg-destructive/10 border-destructive/20'
    case 'low-stock':
      return 'bg-yellow-500/10 border-yellow-500/20'
    default:
      return 'bg-muted'
  }
}
