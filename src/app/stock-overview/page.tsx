import { Navigation } from '@/components/layout/Navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { StockOverview } from '@/components/features/StockOverview'
import { MarketStats } from '@/components/features/MarketStats'

export default function StockOverviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[{ label: 'Stock Overview' }]} 
          className="mb-6"
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Stock Overview</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive monitoring of all Blox Fruits stock levels, status, and availability
          </p>
        </div>

        {/* Market Statistics */}
        <div className="mb-8">
          <MarketStats />
        </div>

        {/* Full Stock Overview */}
        <div className="card p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Stock Status</h2>
              <p className="text-muted-foreground">Search, filter, and monitor all available items</p>
            </div>
          </div>

          <StockOverview />
        </div>
      </main>
    </div>
  )
}
