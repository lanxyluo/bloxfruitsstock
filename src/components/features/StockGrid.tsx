'use client'

import { useState } from 'react'
import { StockCard } from '@/components/ui/StockCard'
import { cn } from '@/lib/utils'
import { allItems } from '@/data/mockFruits'
import { sortFruits } from '@/lib/utils'
import { FruitItem } from '@/types'

const sortOptions = [
  { key: 'name' as const, label: 'Name' },
  { key: 'price' as const, label: 'Price' },
  { key: 'stock' as const, label: 'Stock' },
  { key: 'rarity' as const, label: 'Rarity' },
  { key: 'lastUpdated' as const, label: 'Updated' },
]

export function StockGrid() {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'rarity' | 'lastUpdated'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  const sortedItems = sortFruits(allItems, sortBy, sortDirection)

  return (
    <div className="card p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">All Items</h2>
          <p className="text-muted-foreground">Browse and sort through all available Blox Fruits</p>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        {sortOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleSort(key)}
            className={cn(
              "px-3 py-1 rounded text-sm font-medium transition-colors duration-200",
              sortBy === key
                ? "bg-primary/10 text-primary border border-primary/20"
                : "bg-background text-muted-foreground hover:text-foreground hover:bg-secondary border border-border"
            )}
          >
            {label} {sortBy === key && (sortDirection === 'asc' ? '↑' : '↓')}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {sortedItems.length} items
        </p>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <StockCard key={item.id} fruit={item} />
        ))}
      </div>
    </div>
  )
}
