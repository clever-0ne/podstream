import Head from 'next/head';

export default function CreatorDashboard() {
  // This is the creator's backdoor dashboard
  // It has access to the same API but uses a different admin key
  return (
    <>
      <Head>
        <title>Creator Studio — PodStream Global</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        minHeight: '100vh',
        padding: '40px',
        background: 'linear-gradient(135deg, #0c1526 0%, #1a1f36 100%)',
        color: '#e6edf3'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>Creator Studio</h1>
          <p style={{ color: '#8b949e', marginBottom: '32px' }}>
            Your private backstage access to campaign analytics and user insights.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: '#161b22', border: '1px solid #2b323a', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3fb950' }} id="totalVotes">–</div>
              <div style={{ fontSize: '.85rem', color: '#8b949e' }}>Total Votes</div>
            </div>
            <div style={{ background: '#161b22', border: '1px solid #2b323a', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#58a6ff' }} id="uniqueUsers">–</div>
              <div style={{ fontSize: '.85rem', color: '#8b949e' }}>Unique Voters</div>
            </div>
            <div style={{ background: '#161b22', border: '1px solid #2b323a', borderRadius: '8px', padding: '20px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800' }} id="conversionRate">–</div>
              <div style={{ fontSize: '.85rem', color: '#8b949e' }}>Conversion Rate</div>
            </div>
          </div>

          <div style={{ background: '#161b22', border: '1px solid #2b323a', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '16px', color: '#e6edf3' }}>Live Submissions</h2>
            <input
              type="text"
              placeholder="Search submissions..."
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#0c1526',
                border: '1px solid #2b323a',
                color: '#e6edf3',
                borderRadius: '6px',
                marginBottom: '16px',
                fontFamily: 'inherit'
              }}
              id="searchInput"
            />
            <div id="submissionsList" style={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #2b323a',
              borderRadius: '6px',
              padding: '10px'
            }}>
              <div style={{ color: '#8b949e', textAlign: 'center', padding: '20px' }}>Loading submissions...</div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        const ADMIN_KEY = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CREATOR_KEY || 'creator-key-change-me' : 'creator-key-change-me';
        
        async function fetchSubmissions() {
          try {
            const res = await fetch('/api/admin/summary', {
              headers: { 'X-Admin-Key': ADMIN_KEY }
            });
            const data = await res.json();
            if (data.error) {
              document.getElementById('totalVotes').textContent = 'Error';
              return;
            }
            document.getElementById('totalVotes').textContent = data.total.toLocaleString();
            document.getElementById('uniqueUsers').textContent = data.uniqueUsernames.toLocaleString();
            document.getElementById('conversionRate').textContent = data.total > 0 ? ((data.uniqueUsernames / data.total) * 100).toFixed(1) + '%';
            
            const subsRes = await fetch('/api/admin/submissions', {
              headers: { 'X-Admin-Key': ADMIN_KEY }
            });
            const subsData = await subsRes.json();
            const list = document.getElementById('submissionsList');
            if (subsData.data && subsData.data.length > 0) {
              list.innerHTML = subsData.data.slice(0, 50).map(s => 
                '<div style=\"padding: 10px; border-bottom: 1px solid #2b323a; display: flex; justify-content: space-between; align-items: center;\">' +
                '<div>' +
                '<strong>' + (s.username || 'N/A').replace(/</g, '\u0026lt;').replace(/>/g, '\u0026gt;') + '</strong>' +
                '<div style=\"font-size: .8rem; color: #6a737d; display: flex; gap: 10px;\">' +
                '<span>' + (s.method || 'N/A') + '</span>' +
                '<span>' + (s.country || 'N/A') + '</span>' +
                '</div></div>' +
                '<span style=\"font-size: .8rem; color: #8b949e;\">' + (s.created_at || 'N/A') + '</span>' +
                '</div>'
              ).join('');
            } else {
              list.innerHTML = '<div style=\"padding: 20px; color: #8b949e; text-align: center;\">No submissions yet</div>';
            }
          } catch (e) {
            console.error('Error:', e);
          }
        }
        
        fetchSubmissions();
        setInterval(fetchSubmissions, 5000);
      `}} />
    </div>
  </div>
</>
  );
}