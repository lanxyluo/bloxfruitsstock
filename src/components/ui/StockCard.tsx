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
      "card card-hover p-6 transition-all duration-300 ease-out relative overflow-hidden group",
      getRarityCardClass(fruit.rarity)
    )}>
      {/* Background Glow Effect */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        fruit.rarity === 'Common' && "shadow-[#64748b]/10",
        fruit.rarity === 'Rare' && "shadow-[#3b82f6]/10",
        fruit.rarity === 'Epic' && "shadow-[#8b5cf6]/10",
        fruit.rarity === 'Legendary' && "shadow-[#f59e0b]/10",
        fruit.rarity === 'Mythical' && "shadow-[#ef4444]/10",
      )} />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1">
          <h3 className="font-bold text-foreground text-xl mb-2 group-hover:text-white transition-colors duration-300">
            {fruit.displayName}
          </h3>
          <div className={cn(
            "rarity-badge inline-flex items-center transition-all duration-300 group-hover:scale-105",
            getRarityBgColor(fruit.rarity)
          )}>
            {fruit.rarity}
          </div>
        </div>
        
        <div className={cn(
          "status-badge ml-3 transition-all duration-300 group-hover:scale-105",
          getStatusBgColor(fruit.status)
        )}>
          {fruit.status === 'in-stock' && 'In Stock'}
          {fruit.status === 'out-of-stock' && 'Out of Stock'}
          {fruit.status === 'low-stock' && 'Low Stock'}
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-4 p-4 rounded-xl bg-background/40 backdrop-blur-sm border border-border/30 relative z-10 group-hover:bg-background/50 transition-all duration-300">
        <p className="text-muted-foreground text-sm font-medium mb-1">Price</p>
        <p className="text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
          {formatCurrency(fruit.price)}
        </p>
      </div>

      {/* Stock Section */}
      <div className="mb-4 p-4 rounded-xl bg-background/40 backdrop-blur-sm border border-border/30 relative z-10 group-hover:bg-background/50 transition-all duration-300">
        <p className="text-muted-foreground text-sm font-medium mb-1">Stock</p>
        <p className="text-xl font-semibold text-foreground group-hover:text-white transition-colors duration-300">
          {fruit.stock} units
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30 relative z-10">
        Updated: {new Date(fruit.lastUpdated).toLocaleTimeString()}
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none" />
    </div>
  )
}
