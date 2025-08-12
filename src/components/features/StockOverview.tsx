'use client'

import { useState } from 'react'
import { Search, Filter, RefreshCw } from 'lucide-react'
import { BloxFruit } from '@/types'
import { StockCard } from '@/components/ui/StockCard'

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

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Stock Overview</h2>
        
        <div className="flex items-center space-x-4">
          <button className="btn-secondary flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search fruits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10 w-full"
          />
        </div>
        
        <select
          value={selectedRarity}
          onChange={(e) => setSelectedRarity(e.target.value)}
          className="input-field"
        >
          <option value="all">All Rarities</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
          <option value="Mythical">Mythical</option>
        </select>
        
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="input-field"
        >
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="low-stock">Low Stock</option>
        </select>
      </div>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFruits.map((fruit) => (
          <StockCard key={fruit.id} fruit={fruit} />
        ))}
      </div>

      {filteredFruits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No fruits found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
