import { NextRequest, NextResponse } from 'next/server'
import { allItems, mockFruits, mockGamepasses, mockLimited } from '@/data/mockFruits'
import { filterFruits, sortFruits } from '@/lib/utils'
import { FruitsResponse, RarityLevel, StockStatus } from '@/types'



// GET /api/fruits - Get fruits data with filtering, sorting, and pagination
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

    // Handle category-specific requests
    if (category === 'fruits') {
      filteredItems = mockFruits
    } else if (category === 'gamepasses') {
      filteredItems = mockGamepasses
    } else if (category === 'limited') {
      filteredItems = mockLimited
    }

    // Apply filters
    const filters: any = {}
    
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
