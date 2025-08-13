'use client'

import { FruitItem } from '@/types'
import { formatCurrency, getStatusColor, getStatusBgColor, getRarityBgColor, getRarityCardClass, getStockStatusText, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface StockCardProps {
  fruit: FruitItem
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
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{fruit.icon}</span>
            <h3 className="font-bold text-foreground text-xl">
              {fruit.displayName}
            </h3>
          </div>
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
          {getStockStatusText(fruit.status)}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {fruit.description}
        </p>
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

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 rounded-lg bg-background/30 border border-border/20">
          <p className="text-muted-foreground text-xs font-medium mb-1">Demand</p>
          <p className="text-sm font-semibold text-foreground">{fruit.demand}</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-background/30 border border-border/20">
          <p className="text-muted-foreground text-xs font-medium mb-1">Supply</p>
          <p className="text-sm font-semibold text-foreground">{fruit.supply}</p>
        </div>
      </div>

      {/* Tradeable Status */}
      {!fruit.tradeable && (
        <div className="mb-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <p className="text-warning text-sm font-medium text-center">
            ⚠️ Not Tradeable
          </p>
        </div>
      )}

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
        Updated: {formatRelativeTime(fruit.lastUpdated)}
      </div>
    </div>
  )
}
