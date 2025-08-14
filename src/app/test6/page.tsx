'use client'

import Link from 'next/link'

export default function Test6Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page 6 - Basic Navigation Test</h1>
      
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
        </ol>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Expected Results:</h2>
        <ul style={{ marginLeft: '20px' }}>
          <li>Links should be clickable</li>
          <li>URL should change when clicked</li>
          <li>Page should navigate to the target route</li>
          <li>No JavaScript errors should occur</li>
        </ul>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <p><strong>Note:</strong> This page tests basic Next.js Link navigation without any complex components or hooks.</p>
        <p>If these links work, the issue is with the Navigation component or other complex logic.</p>
        <p>If they don't work, there's a deeper routing issue.</p>
      </div>
    </div>
  )
}
