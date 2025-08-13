import { StockOverview } from '@/components/features/StockOverview'
import { StockGrid } from '@/components/features/StockGrid'
import { MarketStats } from '@/components/features/MarketStats'

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Blox Fruits Stock Monitor
        </h1>
        <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
          Real-time monitoring of Blox Fruits stock availability and market trends. 
          Track prices, availability, and get instant updates on your favorite fruits.
        </p>
      </div>
      
      <div className="grid gap-12">
        <MarketStats />
        <StockOverview />
        <StockGrid />
      </div>
    </div>
  )
}

