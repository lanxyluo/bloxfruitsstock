'use client'

import { useState } from 'react'
import { BloxFruit } from '@/types'
import { StockCard } from '@/components/ui/StockCard'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

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
  {
    id: '5',
    name: 'venom',
    displayName: 'Venom',
    rarity: 'Mythical',
    price: 600000,
    stock: 12,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'control',
    displayName: 'Control',
    rarity: 'Mythical',
    price: 700000,
    stock: 0,
    status: 'out-of-stock',
    lastUpdated: new Date().toISOString(),
  },
]

export function StockGrid() {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'rarity'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedFruits = [...mockFruits].sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sortBy) {
      case 'name':
        aValue = a.displayName
        bValue = b.displayName
        break
      case 'price':
        aValue = a.price
        bValue = b.price
        break
      case 'stock':
        aValue = a.stock
        bValue = b.stock
        break
      case 'rarity':
        aValue = a.rarity
        bValue = b.rarity
        break
      default:
        return 0
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field: 'name' | 'price' | 'stock' | 'rarity') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: 'name' | 'price' | 'stock' | 'rarity') => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4" />
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  return (
    <div className="card p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">All Fruits</h2>
          <p className="text-muted-foreground">Browse and sort through all available Blox Fruits</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground text-sm font-medium">Sort by:</span>
          <div className="flex items-center space-x-2">
            {(['name', 'price', 'stock', 'rarity'] as const).map((field) => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${sortBy === field 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg' 
                    : 'bg-background/50 text-muted-foreground hover:text-white hover:bg-white/10 border border-border/40'
                  }
                `}
              >
                <span className="capitalize">{field}</span>
                {getSortIcon(field)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedFruits.map((fruit) => (
          <StockCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </div>
  )
}
