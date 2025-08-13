import { NextRequest, NextResponse } from 'next/server'
import { allItems, getFruitsByStatus } from '@/data/mockFruits'
import { calculateMarketStats } from '@/lib/utils'
import { StockResponse, StatsResponse } from '@/types'

// GET /api/stock - Get current stock status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const rarity = searchParams.get('rarity')
    const search = searchParams.get('search')

    let filteredItems = [...allItems]

    // Apply filters
    if (status) {
      filteredItems = getFruitsByStatus(status as any)
    }

    if (category) {
      filteredItems = filteredItems.filter(item => item.category === category)
    }

    if (rarity) {
      filteredItems = filteredItems.filter(item => item.rarity === rarity)
    }

    if (search) {
      const searchTerm = search.toLowerCase()
      filteredItems = filteredItems.filter(item =>
        item.displayName.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      )
    }

    const response: StockResponse = {
      success: true,
      data: filteredItems,
      message: 'Stock data retrieved successfully',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching stock data:', error)
    
    const errorResponse: StockResponse = {
      success: false,
      data: [],
      message: 'Failed to fetch stock data',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST /api/stock - Update stock (for admin purposes)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fruitId, newStock, newPrice } = body

    // In a real application, this would update the database
    // For now, we'll just return a success response
    const response = {
      success: true,
      message: 'Stock updated successfully',
      timestamp: new Date().toISOString(),
      updatedItem: {
        id: fruitId,
        stock: newStock,
        price: newPrice
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating stock:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Failed to update stock',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
