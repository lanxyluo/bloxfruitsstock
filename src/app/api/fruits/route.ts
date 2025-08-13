import { NextRequest, NextResponse } from 'next/server'
import { allItems, mockFruits, mockGamepasses, mockLimited } from '@/data/mockFruits'
import { filterFruits, sortFruits } from '@/lib/utils'
import { FruitsResponse, RarityLevel, StockStatus } from '@/types'

// GET /api/fruits - Get all fruits data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const rarity = searchParams.get('rarity')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') as 'name' | 'price' | 'stock' | 'rarity' | 'lastUpdated'
    const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    let filteredItems = [...allItems]

    // Apply filters
    const filters: any = {}
    
    if (category) {
      filters.category = category
    }
    
    if (rarity && Object.values(RarityLevel).includes(rarity as RarityLevel)) {
      filters.rarity = rarity as RarityLevel
    }
    
    if (status && Object.values(StockStatus).includes(status as StockStatus)) {
      filters.status = status as StockStatus
    }
    
    if (search) {
      filters.searchTerm = search
    }

    // Apply filters
    filteredItems = filterFruits(filteredItems, filters)

    // Apply sorting
    if (sortBy && sortDirection) {
      filteredItems = sortFruits(filteredItems, sortBy, sortDirection)
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedItems = filteredItems.slice(startIndex, endIndex)

    const response: FruitsResponse = {
      success: true,
      data: paginatedItems,
      message: 'Fruits data retrieved successfully',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching fruits data:', error)
    
    const errorResponse: FruitsResponse = {
      success: false,
      data: [],
      message: 'Failed to fetch fruits data',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// GET /api/fruits/categories - Get fruits by category
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  if (category === 'fruits') {
    return NextResponse.json({
      success: true,
      data: mockFruits,
      message: 'Fruits data retrieved successfully',
      timestamp: new Date().toISOString()
    })
  }

  if (category === 'gamepasses') {
    return NextResponse.json({
      success: true,
      data: mockGamepasses,
      message: 'Gamepasses data retrieved successfully',
      timestamp: new Date().toISOString()
    })
  }

  if (category === 'limited') {
    return NextResponse.json({
      success: true,
      data: mockLimited,
      message: 'Limited items data retrieved successfully',
      timestamp: new Date().toISOString()
    })
  }

  // Default: return all items
  return NextResponse.json({
    success: true,
    data: allItems,
    message: 'All items data retrieved successfully',
    timestamp: new Date().toISOString()
  })
}
