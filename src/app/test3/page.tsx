'use client'

import { Navigation } from '@/components/layout/Navigation'
import Link from 'next/link'

export default function Test3Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Navigation Test Page</h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Navigation Links:</h2>
          
          <div className="space-y-2">
            <Link 
              href="/" 
              className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            >
              Dashboard (/)
            </Link>
            
            <Link 
              href="/stock-overview" 
              className="block p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
            >
              Stock Overview (/stock-overview)
            </Link>
            
            <Link 
              href="/all-items" 
              className="block p-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition-colors"
            >
              All Items (/all-items)
            </Link>
            
            <Link 
              href="/market-analysis" 
              className="block p-4 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
            >
              Market Analysis (/market-analysis)
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              If these links work, then the issue is with the Navigation component. 
              If they don't work, then there's a deeper routing issue.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
