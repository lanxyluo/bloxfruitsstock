export default function Test4Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page 4 - Simple Navigation Test</h1>
      
      <nav style={{ marginBottom: '20px' }}>
        <a href="/" style={{ 
          display: 'inline-block', 
          marginRight: '10px', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Dashboard
        </a>
        
        <a href="/stock-overview" style={{ 
          display: 'inline-block', 
          marginRight: '10px', 
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Stock Overview
        </a>
        
        <a href="/all-items" style={{ 
          display: 'inline-block', 
          marginRight: '10px', 
          padding: '10px 20px', 
          backgroundColor: '#ffc107', 
          color: 'black', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          All Items
        </a>
        
        <a href="/market-analysis" style={{ 
          display: 'inline-block', 
          marginRight: '10px', 
          padding: '10px 20px', 
          backgroundColor: '#6f42c1', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Market Analysis
        </a>
      </nav>
      
      <p>This page tests basic HTML navigation without any React components.</p>
      <p>If these links work, the issue is with the Navigation component.</p>
      <p>If they don't work, there's a deeper routing issue.</p>
    </div>
  )
}
