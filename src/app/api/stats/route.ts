import { NextRequest, NextResponse } from 'next/server'
import { allItems } from '@/data/mockFruits'
import { calculateMarketStats } from '@/lib/utils'
import { StatsResponse } from '@/types'

// GET /api/stats - Get market statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const rarity = searchParams.get('rarity')

    let itemsToAnalyze = [...allItems]

    // Apply filters if provided
    if (category) {
      itemsToAnalyze = itemsToAnalyze.filter(item => item.category === category)
    }

    if (rarity) {
      itemsToAnalyze = itemsToAnalyze.filter(item => item.rarity === rarity)
    }

    // Calculate market statistics
    const stats = calculateMarketStats(itemsToAnalyze)

    const response: StatsResponse = {
      success: true,
      data: stats,
      message: 'Market statistics retrieved successfully',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching market statistics:', error)
    
    const errorResponse: StatsResponse = {
      success: false,
      data: {
        totalFruits: 0,
        inStock: 0,
        outOfStock: 0,
        lowStock: 0,
        comingSoon: 0,
        averagePrice: 0,
        totalValue: 0,
        lastUpdate: new Date().toISOString(),
        marketTrend: 'stable'
      },
      message: 'Failed to fetch market statistics',
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
