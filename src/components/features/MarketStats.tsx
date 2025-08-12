'use client'

import { TrendingUp, Package, AlertTriangle, DollarSign } from 'lucide-react'
import { MarketStats as MarketStatsType } from '@/types'
import { formatNumber, formatCurrency } from '@/lib/utils'

const mockStats: MarketStatsType = {
  totalFruits: 24,
  inStock: 18,
  outOfStock: 4,
  lowStock: 2,
  averagePrice: 1250000,
  totalValue: 30000000,
  lastUpdate: new Date().toISOString(),
}

const stats = [
  {
    name: 'Total Fruits',
    value: mockStats.totalFruits,
    icon: Package,
    color: 'text-primary',
  },
  {
    name: 'In Stock',
    value: mockStats.inStock,
    icon: TrendingUp,
    color: 'text-success',
  },
  {
    name: 'Out of Stock',
    value: mockStats.outOfStock,
    icon: AlertTriangle,
    color: 'text-destructive',
  },
  {
    name: 'Total Value',
    value: formatCurrency(mockStats.totalValue),
    icon: DollarSign,
    color: 'text-yellow-500',
  },
]

export function MarketStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
