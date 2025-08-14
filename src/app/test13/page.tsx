'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Test13Page() {
  const [count, setCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Simple effect that only runs once
  useEffect(() => {
    setLastUpdate(new Date())
  }, [])

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  const handleReset = () => {
    setCount(0)
    setLastUpdate(new Date())
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Simple Navigation */}
      <nav style={{ 
        backgroundColor: '#1f2937', 
        padding: '16px 0',
        borderBottom: '1px solid #374151'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>
              Test 13 - Minimal Hooks
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
          Test Page 13 - Minimal Hooks Test
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
            <li>✅ Basic useState (count, lastUpdate)</li>
            <li>✅ Simple useEffect (runs once)</li>
            <li>✅ Event handlers (increment, reset)</li>
            <li>✅ Next.js Link components</li>
            <li>❌ NO custom hooks</li>
            <li>❌ NO complex state management</li>
            <li>❌ NO complex effects</li>
            <li>❌ NO complex logic</li>
          </ul>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#10b981', marginBottom: '16px' }}>Interactive Test:</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <button 
              onClick={handleIncrement}
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Increment Count
            </button>
            <button 
              onClick={handleReset}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          </div>
          <p style={{ color: '#d1d5db' }}>
            <strong>Count:</strong> {count} | <strong>Last Update:</strong> {lastUpdate?.toLocaleTimeString() || 'Not set'}
          </p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Navigation Test:</h2>
          <ol style={{ marginLeft: '20px', color: '#d1d5db' }}>
            <li>Click on each navigation link above</li>
            <li>Check if the URL changes in the browser</li>
            <li>Check if the page content changes</li>
            <li>Look for any console errors</li>
            <li>Compare with the main page behavior</li>
          </ol>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#374151', 
          borderRadius: '8px',
          border: '1px solid #4b5563'
        }}>
          <h2 style={{ color: '#fbbf24', marginBottom: '16px' }}>Debug Information:</h2>
          <div style={{ color: '#d1d5db' }}>
            <p><strong>Current URL:</strong> <code>{typeof window !== 'undefined' ? window.location.href : 'Loading...'}</code></p>
            <p><strong>Page Type:</strong> Client-side rendered with minimal hooks</p>
            <p><strong>State Count:</strong> {count}</p>
            <p><strong>Last Update:</strong> {lastUpdate?.toISOString() || 'Not set'}</p>
            <p><strong>Dependencies:</strong> Minimal - just basic React hooks</p>
          </div>
        </div>
      </main>
    </div>
  )
}
