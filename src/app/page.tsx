import { StockOverview } from '@/components/features/StockOverview'
import { StockGrid } from '@/components/features/StockGrid'
import { MarketStats } from '@/components/features/MarketStats'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Blox Fruits Stock Monitor
        </h1>
        <p className="text-muted-foreground text-lg">
          Real-time monitoring of Blox Fruits stock availability and market trends
        </p>
      </div>
      
      <div className="grid gap-8">
        <MarketStats />
        <StockOverview />
        <StockGrid />
      </div>
    </div>
  )
}

