export default function Test8Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page 8 - Basic Route Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Manual Navigation Test:</h2>
        <p>Try manually typing these URLs in your browser address bar:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li><code>http://localhost:3000/</code> - Dashboard</li>
          <li><code>http://localhost:3000/stock-overview</code> - Stock Overview</li>
          <li><code>http://localhost:3000/all-items</code> - All Items</li>
          <li><code>http://localhost:3000/market-analysis</code> - Market Analysis</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Browser Back/Forward Test:</h2>
        <p>After navigating to different pages:</p>
        <ol style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Use the browser's back button (←)</li>
          <li>Use the browser's forward button (→)</li>
          <li>Check if the URL changes correctly</li>
          <li>Check if the page content updates</li>
        </ol>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Console Check:</h2>
        <p>Open your browser's Developer Tools (F12) and check:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Console tab for any JavaScript errors</li>
          <li>Network tab for any failed requests</li>
          <li>Performance tab for any performance issues</li>
        </ul>
      </div>
      
      <div style={{ padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <p><strong>Purpose:</strong> This test helps isolate whether the issue is with:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Next.js routing system</li>
          <li>Navigation component logic</li>
          <li>JavaScript event handling</li>
          <li>CSS or styling issues</li>
        </ul>
      </div>
    </div>
  )
}
