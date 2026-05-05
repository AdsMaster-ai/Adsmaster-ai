export default function Layout({ children }) {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <nav style={{ 
        display: 'flex', justifyContent: 'space-between', padding: '15px 40px', 
        background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '35px', height: '35px', background: '#3b82f6', borderRadius: '8px' }}></div>
          <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.5px' }}>AdPilot AI</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/dashboard" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: '500' }}>Dashboard</a>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#eee' }}></div>
        </div>
      </nav>
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}