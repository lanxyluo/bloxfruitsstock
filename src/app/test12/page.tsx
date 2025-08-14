'use client'

import React from 'react'
import Link from 'next/link'

export default function Test12Page() {
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
              Blox Fruits Stock - Test 12
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
          Test Page 12 - Complete Isolation
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
            <li>✅ NO React hooks</li>
            <li>✅ NO useState</li>
            <li>✅ NO useEffect</li>
            <li>✅ NO useCallback</li>
            <li>✅ NO useMemo</li>
            <li>✅ NO custom hooks</li>
            <li>✅ NO state management</li>
            <li>✅ NO event handlers</li>
            <li>✅ NO complex logic</li>
            <li>✅ Just static HTML with basic styling</li>
          </ul>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#10b981', marginBottom: '16px' }}>Test Instructions:</h2>
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
          backgroundColor: '#1f2937', 
          borderRadius: '8px',
          border: '1px solid #374151',
          marginBottom: '32px'
        }}>
          <h2 style={{ color: '#ef4444', marginBottom: '16px' }}>Expected Results:</h2>
          <div style={{ color: '#d1d5db' }}>
            <p><strong>If this page works perfectly:</strong></p>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>Next.js routing is working correctly</li>
              <li>The issue is with React hooks or state management</li>
              <li>We need to focus on fixing the hooks, not the routing</li>
            </ul>
            
            <p style={{ marginTop: '20px' }}><strong>If this page also has issues:</strong></p>
            <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
              <li>The issue is with Next.js routing or configuration</li>
              <li>We need to check Next.js setup and configuration</li>
              <li>The problem is deeper than just React hooks</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#374151', 
          borderRadius: '8px',
          border: '1px solid #4b5563'
        }}>
          <h2 style={{ color: '#fbbf24', marginBottom: '16px' }}>Debug Information:</h2>
          <div style={{ color: '#d1d5db' }}>
            <p><strong>Current URL:</strong> <code id="current-url">{typeof window !== 'undefined' ? window.location.href : 'Loading...'}</code></p>
            <p><strong>Page Type:</strong> Static page with no JavaScript execution</p>
            <p><strong>Rendering:</strong> Server-side rendered with no client-side hydration</p>
            <p><strong>Dependencies:</strong> None - completely isolated</p>
          </div>
        </div>
      </main>
    </div>
  )
}
