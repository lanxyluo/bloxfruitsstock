'use client'

import { TrendingUp, Package, AlertTriangle, DollarSign } from 'lucide-react'
import { MarketStats as MarketStatsType } from '@/types'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

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
    color: 'text-[#3b82f6]',
    bgColor: 'bg-[#3b82f6]/20',
    borderColor: 'border-[#3b82f6]/30',
    glowColor: 'shadow-[#3b82f6]/20',
  },
  {
    name: 'In Stock',
    value: mockStats.inStock,
    icon: TrendingUp,
    color: 'text-[#10b981]',
    bgColor: 'bg-[#10b981]/20',
    borderColor: 'border-[#10b981]/30',
    glowColor: 'shadow-[#10b981]/20',
  },
  {
    name: 'Out of Stock',
    value: mockStats.outOfStock,
    icon: AlertTriangle,
    color: 'text-[#ef4444]',
    bgColor: 'bg-[#ef4444]/20',
    borderColor: 'border-[#ef4444]/30',
    glowColor: 'shadow-[#ef4444]/20',
  },
  {
    name: 'Total Value',
    value: formatCurrency(mockStats.totalValue),
    icon: DollarSign,
    color: 'text-[#f59e0b]',
    bgColor: 'bg-[#f59e0b]/20',
    borderColor: 'border-[#f59e0b]/30',
    glowColor: 'shadow-[#f59e0b]/20',
  },
]

export function MarketStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="card card-hover p-6 group relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            stat.glowColor
          )} />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-medium mb-2">{stat.name}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
            <div className={cn(
              "p-4 rounded-xl transition-all duration-300 group-hover:scale-110 border",
              stat.bgColor,
              stat.borderColor
            )}>
              <stat.icon className={cn("w-7 h-7", stat.color)} />
            </div>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none" />
        </div>
      ))}
    </div>
  )
}
