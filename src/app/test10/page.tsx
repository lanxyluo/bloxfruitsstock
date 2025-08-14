export default function Test10Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page 10 - Minimal Route Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Manual URL Test:</h2>
        <p>Copy and paste these URLs into your browser address bar:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li><code>http://localhost:3000/</code></li>
          <li><code>http://localhost:3000/stock-overview</code></li>
          <li><code>http://localhost:3000/all-items</code></li>
          <li><code>http://localhost:3000/market-analysis</code></li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Browser Navigation Test:</h2>
        <p>After manually navigating to different pages:</p>
        <ol style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Use browser back button (←)</li>
          <li>Use browser forward button (→)</li>
          <li>Check if URL changes</li>
          <li>Check if page content updates</li>
        </ol>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Console Check:</h2>
        <p>Open DevTools (F12) and check:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Console tab for errors</li>
          <li>Network tab for requests</li>
          <li>Performance tab for issues</li>
        </ul>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '5px', border: '1px solid #4caf50' }}>
        <p><strong>This page has:</strong></p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>No JavaScript</li>
          <li>No React hooks</li>
          <li>No state management</li>
          <li>No event handlers</li>
          <li>Just static HTML</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
        <p><strong>If manual navigation works but the main app doesn't:</strong></p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>The issue is with JavaScript/React, not Next.js routing</li>
          <li>There's likely an infinite loop in the hooks</li>
          <li>The Navigation component may have event handling issues</li>
        </ul>
      </div>
    </div>
  )
}
