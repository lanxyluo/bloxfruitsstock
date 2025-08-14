'use client'

import Link from 'next/link'

export default function Test11Page() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      <nav style={{ backgroundColor: '#1f2937', padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Blox Fruits Stock</span>
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/" style={{ padding: '8px 12px', color: '#3b82f6', textDecoration: 'none' }}>
                Dashboard
              </Link>
              <Link href="/stock-overview" style={{ padding: '8px 12px', color: '#d1d5db', textDecoration: 'none' }}>
                Stock Overview
              </Link>
              <Link href="/all-items" style={{ padding: '8px 12px', color: '#d1d5db', textDecoration: 'none' }}>
                All Items
              </Link>
              <Link href="/market-analysis" style={{ padding: '8px 12px', color: '#d1d5db', textDecoration: 'none' }}>
                Market Analysis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <h1>Test Page 11 - Simplified Main Page</h1>
        <p>This page has no hooks, no state, no effects - just basic navigation.</p>
        
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#1f2937', borderRadius: '8px' }}>
          <h2>Test Instructions:</h2>
          <ol>
            <li>Click on the navigation links above</li>
            <li>Check if navigation works</li>
            <li>Look for console errors</li>
          </ol>
        </div>
      </main>
    </div>
  )
}
