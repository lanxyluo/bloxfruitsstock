'use client'

import { TrendingUp, Package, AlertTriangle, DollarSign, Clock } from 'lucide-react'
import { MarketStats as MarketStatsType } from '@/types'
import { formatCurrency, calculateMarketStats } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { allItems } from '@/data/mockFruits'

// Calculate stats from mock data
const marketStats = calculateMarketStats(allItems)

const stats = [
  {
    name: 'Total Items',
    value: marketStats.totalFruits,
    icon: Package,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20',
  },
  {
    name: 'In Stock',
    value: marketStats.inStock,
    icon: TrendingUp,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
  },
  {
    name: 'Out of Stock',
    value: marketStats.outOfStock,
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    borderColor: 'border-destructive/20',
  },
  {
    name: 'Low Stock',
    value: marketStats.lowStock,
    icon: Clock,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20',
  },
  {
    name: 'Total Value',
    value: formatCurrency(marketStats.totalValue),
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20',
  },
]

export function MarketStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="card card-hover p-6 group">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-medium mb-2">{stat.name}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={cn(
              "p-4 rounded-lg transition-all duration-200 group-hover:scale-110 border",
              stat.bgColor,
              stat.borderColor
            )}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
