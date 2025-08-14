export default function Test2Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page 2</h1>
      <p>This page has no dependencies on hooks or complex logic.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none',
          borderRadius: '5px'
        }}>
          Go Home
        </a>
      </div>
    </div>
  )
}
