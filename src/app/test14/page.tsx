'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'

// Mock data for testing
const mockFruits = [
  { id: '1', name: 'Test Fruit 1', price: 100, stock: 10, status: 'in-stock' },
  { id: '2', name: 'Test Fruit 2', price: 200, stock: 5, status: 'low-stock' },
  { id: '3', name: 'Test Fruit 3', price: 300, stock: 0, status: 'out-of-stock' }
]

export default function Test14Page() {
  // Basic state - minimal and safe
  const [fruits, setFruits] = useState(mockFruits)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  // Simple effect that only runs once
  useEffect(() => {
    if (!lastRefresh) {
      setLastRefresh(new Date())
    }
  }, []) // No dependencies to avoid loops

  // Debounced search - simple implementation
  const debouncedSearchQuery = useMemo(() => {
    // Simple debounce without complex logic
    return searchQuery
  }, [searchQuery])

  // Filtered fruits - simple filtering
  const filteredFruits = useMemo(() => {
    if (!debouncedSearchQuery) return fruits
    
    return fruits.filter(fruit =>
      fruit.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  }, [fruits, debouncedSearchQuery])

  // Simple refresh function
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return
    
    setIsRefreshing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLastRefresh(new Date())
    } catch (error) {
      console.error('Refresh failed:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [isRefreshing])

  // Simple add to favorites
  const handleAddToFavorites = useCallback((fruit: any) => {
    console.log('Added to favorites:', fruit.name)
    // Simple action without complex state management
  }, [])

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#1f2937', 
        padding: '16px 0',
        borderBottom: '1px solid #374151'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
              Test 14 - Progressive Main Page
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/" style={{ 
                padding: '8px 12px', 
                color: '#3b82f6', 
                textDecoration: 'none',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                Dashboard
              </Link>
              <Link href="/stock-overview" style={{ 
                padding: '8px 12px', 
                color: '#d1d5db', 
                textDecoration: 'none',
                borderRadius: '6px'
              }}>
                Stock Overview
              </Link>
              <Link href="/all-items" style={{ 
                padding: '8px 12px', 
                color: '#d1d5db', 
                textDecoration: 'none',
                borderRadius: '6px'
              }}>
                All Items
              </Link>
              <Link href="/market-analysis" style={{ 
                padding: '8px 12px', 
                color: '#d1d5db', 
                textDecoration: 'none',
                borderRadius: '6px'
              }}>
                Market Analysis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
          Test Page 14 - Progressive Main Page
        </h1>
        
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#eab308', marginBottom: '16px' }}>This Page Has:</h2>
          <ul style={{ marginLeft: '20px', color: '#d1d5db' }}>
            <li>✅ Basic useState (fruits, searchQuery, isRefreshing, lastRefresh)</li>
            <li>✅ Simple useEffect (runs once, no dependencies)</li>
            <li>✅ useMemo for filtering (simple logic)</li>
            <li>✅ useCallback for event handlers</li>
            <li>✅ Next.js Link components</li>
            <li>✅ Mock data and basic functionality</li>
            <li>❌ NO custom hooks</li>
            <li>❌ NO complex state management</li>
            <li>❌ NO complex effects</li>
            <li>❌ NO localStorage operations</li>
          </ul>
        </div>

        {/* Search and Controls */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#10b981', marginBottom: '16px' }}>Controls:</h2>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search fruits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #374151',
                backgroundColor: '#1f2937',
                color: 'white',
                minWidth: '200px'
              }}
            />
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              style={{
                padding: '8px 16px',
                backgroundColor: isRefreshing ? '#6b7280' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isRefreshing ? 'not-allowed' : 'pointer'
              }}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <p style={{ color: '#d1d5db' }}>
            <strong>Last Refresh:</strong> {lastRefresh?.toLocaleTimeString() || 'Not set'} | 
            <strong> Results:</strong> {filteredFruits.length} of {fruits.length}
          </p>
        </div>

        {/* Fruits List */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Fruits List:</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            {filteredFruits.map(fruit => (
              <div 
                key={fruit.id}
                style={{
                  padding: '16px',
                  backgroundColor: '#374151',
                  borderRadius: '6px',
                  border: '1px solid '#4b5563'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: 'white' }}>{fruit.name}</h3>
                    <p style={{ margin: '0', color: '#d1d5db' }}>
                      Price: ${fruit.price} | Stock: {fruit.stock} | Status: {fruit.status}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleAddToFavorites(fruit)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Test */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#fbbf24', marginBottom: '16px' }}>Navigation Test:</h2>
          <ol style={{ marginLeft: '20px', color: '#d1d5db' }}>
            <li>Click on each navigation link above</li>
            <li>Check if the URL changes in the browser</li>
            <li>Check if the page content changes</li>
            <li>Look for any console errors</li>
            <li>Compare with the main page behavior</li>
          </ol>
        </div>

        {/* Debug Information */}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#374151', 
          borderRadius: '8px',
          border: '1px solid '#4b5563'
        }}>
          <h2 style={{ color: '#fbbf24', marginBottom: '16px' }}>Debug Information:</h2>
          <div style={{ color: '#d1d5db' }}>
            <p><strong>Current URL:</strong> <code>{typeof window !== 'undefined' ? window.location.href : 'Loading...'}</code></p>
            <p><strong>Page Type:</strong> Client-side rendered with progressive features</p>
            <p><strong>Fruits Count:</strong> {fruits.length}</p>
            <p><strong>Filtered Count:</strong> {filteredFruits.length}</p>
            <p><strong>Search Query:</strong> "{searchQuery}"</p>
            <p><strong>Last Refresh:</strong> {lastRefresh?.toISOString() || 'Not set'}</p>
            <p><strong>Dependencies:</strong> Progressive - basic hooks + simple functionality</p>
          </div>
        </div>
      </main>
    </div>
  )
}
