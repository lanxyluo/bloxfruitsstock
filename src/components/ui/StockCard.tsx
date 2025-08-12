'use client'

import { BloxFruit } from '@/types'
import { formatNumber, formatCurrency, getStatusColor, getStatusBgColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface StockCardProps {
  fruit: BloxFruit
}

const rarityColors = {
  Common: 'text-gray-400',
  Uncommon: 'text-green-400',
  Rare: 'text-blue-400',
  Epic: 'text-purple-400',
  Legendary: 'text-yellow-400',
  Mythical: 'text-red-400',
}

const rarityBgColors = {
  Common: 'bg-gray-400/10 border-gray-400/20',
  Uncommon: 'bg-green-400/10 border-green-400/20',
  Rare: 'bg-blue-400/10 border-blue-400/20',
  Epic: 'bg-purple-400/10 border-purple-400/20',
  Legendary: 'bg-yellow-400/10 border-yellow-400/20',
  Mythical: 'bg-red-400/10 border-red-400/20',
}

export function StockCard({ fruit }: StockCardProps) {
  return (
    <div className={cn(
      "card p-4 transition-all duration-200 hover:scale-105 hover:shadow-xl",
      getStatusBgColor(fruit.status)
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg">{fruit.displayName}</h3>
          <div className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1",
            rarityBgColors[fruit.rarity],
            rarityColors[fruit.rarity]
          )}>
            {fruit.rarity}
          </div>
        </div>
        
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          getStatusColor(fruit.status)
        )}>
          {fruit.status === 'in-stock' && 'In Stock'}
          {fruit.status === 'out-of-stock' && 'Out of Stock'}
          {fruit.status === 'low-stock' && 'Low Stock'}
        </div>
      </div>

      {/* Price */}
      <div className="mb-3">
        <p className="text-muted-foreground text-sm">Price</p>
        <p className="text-xl font-bold text-foreground">
          {formatCurrency(fruit.price)}
        </p>
      </div>

      {/* Stock */}
      <div className="mb-3">
        <p className="text-muted-foreground text-sm">Stock</p>
        <p className="text-lg font-semibold text-foreground">
          {fruit.stock} units
        </p>
      </div>

      {/* Last Updated */}
      <div className="text-xs text-muted-foreground">
        Updated: {new Date(fruit.lastUpdated).toLocaleTimeString()}
      </div>
    </div>
  )
}
