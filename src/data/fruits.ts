import { BloxFruit } from '@/types'

export const fruitsData: BloxFruit[] = [
  {
    id: '1',
    name: 'dragon',
    displayName: 'Dragon',
    rarity: 'Mythical',
    price: 2500000,
    stock: 5,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
    description: 'One of the most powerful Mythical fruits in the game',
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
    description: 'A fast and agile Mythical fruit',
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
    description: 'A versatile Mythical fruit with unique abilities',
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
    description: 'A stealth-focused Mythical fruit',
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
    description: 'A poison-based Mythical fruit',
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
    description: 'A mind-control Mythical fruit',
  },
  {
    id: '7',
    name: 'spirit',
    displayName: 'Spirit',
    rarity: 'Mythical',
    price: 900000,
    stock: 3,
    status: 'low-stock',
    lastUpdated: new Date().toISOString(),
    description: 'A spiritual Mythical fruit',
  },
  {
    id: '8',
    name: 'buddha',
    displayName: 'Buddha',
    rarity: 'Legendary',
    price: 400000,
    stock: 15,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
    description: 'A defensive Legendary fruit',
  },
  {
    id: '9',
    name: 'quake',
    displayName: 'Quake',
    rarity: 'Legendary',
    price: 350000,
    stock: 20,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
    description: 'An earthquake-based Legendary fruit',
  },
  {
    id: '10',
    name: 'light',
    displayName: 'Light',
    rarity: 'Legendary',
    price: 300000,
    stock: 18,
    status: 'in-stock',
    lastUpdated: new Date().toISOString(),
    description: 'A light-based Legendary fruit',
  },
]

export const rarityOrder = {
  'Common': 1,
  'Uncommon': 2,
  'Rare': 3,
  'Epic': 4,
  'Legendary': 5,
  'Mythical': 6,
}

export function getFruitsByRarity(rarity: string): BloxFruit[] {
  return fruitsData.filter(fruit => fruit.rarity === rarity)
}

export function getFruitsByStatus(status: string): BloxFruit[] {
  return fruitsData.filter(fruit => fruit.status === status)
}

export function searchFruits(query: string): BloxFruit[] {
  return fruitsData.filter(fruit => 
    fruit.displayName.toLowerCase().includes(query.toLowerCase()) ||
    fruit.description?.toLowerCase().includes(query.toLowerCase())
  )
}
