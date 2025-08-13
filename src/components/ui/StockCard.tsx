'use client'

import { BloxFruit } from '@/types'
import { formatNumber, formatCurrency, getStatusColor, getStatusBgColor, getRarityBgColor, getRarityCardClass } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface StockCardProps {
  fruit: BloxFruit
}

export function StockCard({ fruit }: StockCardProps) {
  return (
    <div className={cn(
      "card card-hover p-6 transition-all duration-200 ease-out group",
      getRarityCardClass(fruit.rarity)
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-xl mb-2">
            {fruit.displayName}
          </h3>
          <div className={cn(
            "rarity-badge inline-flex items-center",
            getRarityBgColor(fruit.rarity)
          )}>
            {fruit.rarity}
          </div>
        </div>
        
        <div className={cn(
          "status-badge ml-3",
          getStatusBgColor(fruit.status)
        )}>
          {fruit.status === 'in-stock' && 'In Stock'}
          {fruit.status === 'out-of-stock' && 'Out of Stock'}
          {fruit.status === 'low-stock' && 'Low Stock'}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4 p-4 rounded-lg bg-background/50 border border-border/30">
        <p className="text-muted-foreground text-sm font-medium mb-1">Price</p>
        <p className="text-2xl font-bold text-foreground">
          {formatCurrency(fruit.price)}
        </p>
      </div>

      {/* Stock Section */}
      <div className="mb-4 p-4 rounded-lg bg-background/50 border border-border/30">
        <p className="text-muted-foreground text-sm font-medium mb-1">Stock</p>
        <p className="text-xl font-semibold text-foreground">
          {fruit.stock} units
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
        Updated: {new Date(fruit.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  )
}
