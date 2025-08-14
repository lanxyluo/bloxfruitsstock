import { SimpleNavigation } from '@/components/layout/SimpleNavigation'

export default function Test5Page() {
  return (
    <div className="min-h-screen bg-background">
      <SimpleNavigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Simple Navigation Test</h1>
        
        <div className="space-y-4">
          <p className="text-lg text-muted-foreground">
            This page uses a simplified navigation component with inline styles instead of Tailwind CSS.
          </p>
          
          <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Test Instructions:</h2>
            <ol className="list-decimal list-inside space-y-1 text-blue-700">
              <li>Try clicking on the navigation links above</li>
              <li>Check if the pages actually navigate</li>
              <li>Look for any console errors</li>
              <li>Test both desktop and mobile views</li>
            </ol>
          </div>
          
          <div className="p-4 bg-green-100 rounded-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Expected Behavior:</h2>
            <ul className="list-disc list-inside space-y-1 text-green-700">
              <li>Navigation links should be clickable</li>
              <li>Clicking should navigate to the target page</li>
              <li>URL should change in the browser</li>
              <li>No JavaScript errors should occur</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
