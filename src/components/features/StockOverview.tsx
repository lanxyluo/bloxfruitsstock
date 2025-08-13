'use client'

import { useState } from 'react'
import { Search, Filter, RefreshCw, X } from 'lucide-react'
import { BloxFruit } from '@/types'
import { StockCard } from '@/components/ui/StockCard'
import { cn } from '@/lib/utils'

const mockFruits: BloxFruit[] = [
  {
    id: '1',
    name: 'dragon',
    displayName: 'Dragon',
    rarity: 'Mythical',
    price: 2500000,
    stock: 5,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'leopard',
    displayName: 'Leopard',
    rarity: 'Mythical',
    price: 1800000,
    stock: 0,
    status: 'out-of-stock',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'dough',
    displayName: 'Dough',
    rarity: 'Mythical',
    price: 1200000,
    stock: 2,
    status: 'low-stock',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'shadow',
    displayName: 'Shadow',
    rarity: 'Mythical',
    price: 800000,
    stock: 8,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
  },
]

const rarityOptions = [
  { value: 'all', label: 'All Rarities' },
  { value: 'Common', label: 'Common' },
  { value: 'Uncommon', label: 'Uncommon' },
  { value: 'Rare', label: 'Rare' },
  { value: 'Epic', label: 'Epic' },
  { value: 'Legendary', label: 'Legendary' },
  { value: 'Mythical', label: 'Mythical' },
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'in-stock', label: 'In Stock' },
  { value: 'out-of-stock', label: 'Out of Stock' },
  { value: 'low-stock', label: 'Low Stock' },
]

export function StockOverview() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredFruits = mockFruits.filter((fruit) => {
    const matchesSearch = fruit.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === 'all' || fruit.rarity === selectedRarity
    const matchesStatus = selectedStatus === 'all' || fruit.status === selectedStatus
    return matchesSearch && matchesRarity && matchesStatus
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedRarity('all')
    setSelectedStatus('all')
  }

  const hasActiveFilters = searchTerm || selectedRarity !== 'all' || selectedStatus !== 'all'

  return (
    <div className="card p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Stock Overview</h2>
          <p className="text-muted-foreground">Search and filter through available Blox Fruits</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-background/50 text-muted-foreground hover:text-white hover:bg-white/10 border border-border/40 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Clear Filters</span>
            </button>
          )}
          <button className="btn-secondary flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search fruits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-12 w-full"
          />
        </div>
        
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

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredFruits.length} of {mockFruits.length} fruits
        </p>
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFruits.map((fruit) => (
          <StockCard key={fruit.id} fruit={fruit} />
        ))}
      </div>

      {filteredFruits.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No fruits found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  )
}
