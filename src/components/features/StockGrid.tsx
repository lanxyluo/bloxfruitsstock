'use client'

import { useState } from 'react'
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

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">All Fruits</h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-muted-foreground text-sm">Sort by:</span>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder]
              setSortBy(field)
              setSortOrder(order)
            }}
            className="input-field text-sm"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
            <option value="stock-asc">Stock (Low-High)</option>
            <option value="stock-desc">Stock (High-Low)</option>
            <option value="rarity-asc">Rarity (Low-High)</option>
            <option value="rarity-desc">Rarity (High-Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedFruits.map((fruit) => (
          <StockCard key={fruit.id} fruit={fruit} />
        ))}
      </div>
    </div>
  )
}
