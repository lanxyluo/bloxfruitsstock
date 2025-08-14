'use client'

import Link from 'next/link'

export default function Test9Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page 9 - Complete Isolation Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>This page has NO hooks, NO state, NO effects</h2>
        <p>It's completely isolated to test if the issue is with the page itself or the hooks.</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Test Links:</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href="/" style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            Dashboard (/)
          </Link>
          
          <Link href="/stock-overview" style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            Stock Overview (/stock-overview)
          </Link>
          
          <Link href="/all-items" style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            backgroundColor: '#ffc107', 
            color: 'black', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            All Items (/all-items)
          </Link>
          
          <Link href="/market-analysis" style={{ 
            display: 'inline-block', 
            padding: '10px 20px', 
            backgroundColor: '#6f42c1', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '5px'
          }}>
            Market Analysis (/market-analysis)
          </Link>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Test Instructions:</h2>
        <ol style={{ marginLeft: '20px' }}>
          <li>Click on each navigation link above</li>
          <li>Check if the URL changes in the browser</li>
          <li>Check if the page content changes</li>
          <li>Look for any console errors</li>
          <li>Compare with the main page behavior</li>
        </ol>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <p><strong>Purpose:</strong> This page tests if the issue is:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>With the page content itself</li>
          <li>With the hooks and state management</li>
          <li>With the Next.js routing system</li>
          <li>With the browser or environment</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
        <p><strong>Expected Result:</strong> If this page works but the main page doesn't, the issue is with the hooks and state management, not with the routing system.</p>
      </div>
    </div>
  )
}
