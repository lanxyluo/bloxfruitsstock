'use client'

import { useState } from 'react'
import { Search, Filter, RefreshCw, X, ArrowRight } from 'lucide-react'
import { FruitItem, RarityLevel, StockStatus } from '@/types'
import { StockCard } from '@/components/ui/StockCard'
import { cn } from '@/lib/utils'
import { allItems, getFruitsByRarity, getFruitsByStatus } from '@/data/mockFruits'
import { filterFruits, sortFruits } from '@/lib/utils'
import Link from 'next/link'

const rarityOptions = [
  { value: 'all', label: 'All Rarities' },
  { value: RarityLevel.COMMON, label: 'Common' },
  { value: RarityLevel.UNCOMMON, label: 'Uncommon' },
  { value: RarityLevel.RARE, label: 'Rare' },
  { value: RarityLevel.EPIC, label: 'Epic' },
  { value: RarityLevel.LEGENDARY, label: 'Legendary' },
  { value: RarityLevel.MYTHICAL, label: 'Mythical' },
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: StockStatus.IN_STOCK, label: 'In Stock' },
  { value: StockStatus.OUT_OF_STOCK, label: 'Out of Stock' },
  { value: StockStatus.LOW_STOCK, label: 'Low Stock' },
  { value: StockStatus.COMING_SOON, label: 'Coming Soon' },
]

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Fruit', label: 'Fruits' },
  { value: 'Gamepass', label: 'Gamepasses' },
  { value: 'Limited', label: 'Limited' },
]

interface StockOverviewProps {
  maxItems?: number
  showViewAll?: boolean
}

export function StockOverview({ maxItems, showViewAll = true }: StockOverviewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'rarity' | 'lastUpdated'>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Filter and sort items
  const filteredItems = filterFruits(allItems, {
    searchTerm,
    rarity: selectedRarity !== 'all' ? selectedRarity as RarityLevel : undefined,
    status: selectedStatus !== 'all' ? selectedStatus as StockStatus : undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
  })

  const sortedItems = sortFruits(filteredItems, sortBy, sortDirection)
  
  // Limit items if maxItems is specified
  const displayItems = maxItems ? sortedItems.slice(0, maxItems) : sortedItems

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedRarity('all')
    setSelectedStatus('all')
    setSelectedCategory('all')
    setSortBy('name')
    setSortDirection('asc')
  }

  const hasActiveFilters = searchTerm || selectedRarity !== 'all' || selectedStatus !== 'all' || selectedCategory !== 'all'

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDirection('asc')
    }
  }

  return (
    <div>
      {/* Filters - Only show if not limited view */}
      {!maxItems && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="input-field"
            >
              {rarityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="input-field"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            {[
              { key: 'name' as const, label: 'Name' },
              { key: 'price' as const, label: 'Price' },
              { key: 'stock' as const, label: 'Stock' },
              { key: 'rarity' as const, label: 'Rarity' },
              { key: 'lastUpdated' as const, label: 'Updated' },
            ].map(({ key, label }) => (
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
              Showing {sortedItems.length} of {allItems.length} items
            </p>
          </div>
        </>
      )}

      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayItems.map((item) => (
          <StockCard key={item.id} fruit={item} />
        ))}
      </div>

      {/* View All Button for limited view */}
      {maxItems && showViewAll && sortedItems.length > maxItems && (
        <div className="text-center mt-8">
          <Link 
            href="/stock-overview" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors duration-200"
          >
            <span>View All {sortedItems.length} Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* No Results Message */}
      {sortedItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
