import { Navigation } from '@/components/layout/Navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import StockGrid from '@/components/features/StockGrid'

export default function AllItemsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[{ label: 'All Items' }]} 
          className="mb-6"
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">All Items</h1>
          <p className="text-xl text-muted-foreground">
            Complete catalog of all Blox Fruits, Gamepasses, and limited items with advanced filtering and sorting
          </p>
        </div>

        {/* Full Items Grid */}
        <StockGrid fruits={[]} />
      </main>
    </div>
  )
}
