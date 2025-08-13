import { Navigation } from '@/components/layout/Navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { MarketStats } from '@/components/features/MarketStats'

export default function MarketAnalysisPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[{ label: 'Market Analysis' }]} 
          className="mb-6"
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Market Analysis</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive market insights, trends, and statistical analysis for Blox Fruits trading
          </p>
        </div>

        {/* Market Statistics */}
        <div className="mb-8">
          <MarketStats />
        </div>

        {/* Market Analysis Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Trends */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Price Trends</h2>
            <p className="text-muted-foreground mb-6">
              Track price movements and identify market opportunities
            </p>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Price Chart Coming Soon</p>
            </div>
          </div>

          {/* Rarity Distribution */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Rarity Distribution</h2>
            <p className="text-muted-foreground mb-6">
              Visualize the distribution of items by rarity level
            </p>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Rarity Chart Coming Soon</p>
            </div>
          </div>

          {/* Supply vs Demand */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Supply vs Demand</h2>
            <p className="text-muted-foreground mb-6">
              Analyze market balance and identify trading opportunities
            </p>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Supply/Demand Chart Coming Soon</p>
            </div>
          </div>

          {/* Market Insights */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Market Insights</h2>
            <p className="text-muted-foreground mb-6">
              Key insights and recommendations for traders
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">High Demand Items</h3>
                <p className="text-sm text-muted-foreground">
                  Dragon, Leopard, and Dough fruits are currently in high demand with limited supply.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h3 className="font-semibold text-yellow-500 mb-2">Price Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Several rare fruits have seen significant price increases in the last 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
