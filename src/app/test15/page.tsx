'use client'

import React from 'react'
import Link from 'next/link'

export default function Test15Page() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1>Test Page 15 - Ultra Simple</h1>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#1f2937', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Navigation Test</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ 
            padding: '8px 16px', 
            backgroundColor: '#3b82f6', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}>
            Home
          </Link>
          <Link href="/stock-overview" style={{ 
            padding: '8px 16px', 
            backgroundColor: '#10b981', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}>
            Stock Overview
          </Link>
          <Link href="/all-items" style={{ 
            padding: '8px 16px', 
            backgroundColor: '#f59e0b', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}>
            All Items
          </Link>
          <Link href="/market-analysis" style={{ 
            padding: '8px 16px', 
            backgroundColor: '#ef4444', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}>
            Market Analysis
          </Link>
        </div>
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#1f2937', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Instructions</h2>
        <ol>
          <li>Click each navigation link above</li>
          <li>Check if the URL changes</li>
          <li>Check if the page content changes</li>
          <li>Look for console errors</li>
        </ol>
      </div>

      <div style={{ 
        padding: '20px', 
        backgroundColor: '#374151', 
        borderRadius: '8px'
      }}>
        <h2>Current Status</h2>
        <p>This is a simple test page with basic navigation links.</p>
        <p>If this page works, the issue is with React hooks, not Next.js routing.</p>
      </div>
    </div>
  )
}
