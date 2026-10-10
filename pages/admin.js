import Head from 'next/head';
import Link from 'next/link';

export default function AdminDashboard() {
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
          --bg: #050b18; --surface: #0c1526; --border: rgba(96, 165, 250, 0.16);
          --text: #e6edf3; --muted: #8b949e; --header: #0c1526; --header-border: rgba(96,165,250,0.2);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
        .logo { font-size: 1.6rem; font-weight: 700; color: var(--text); text-decoration: none; }
        .tag { font-size: .75rem; font-weight: 700; letter-spacing: 2px; color: var(--blue-light); text-transform: uppercase; border: 1px solid var(--border); background: rgba(96,165,250,.1); padding: 4px 10px; border-radius: 100px; }
        .logo-mark { width: 28px; height: 28px; border-radius: 50%; background: var(--gradient-primary); display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: .8rem; }
        header { display: flex; justify-content: space-between; align-items: center; padding: 14px 0 24px; border-bottom: 1px solid var(--header-border); margin-bottom: 24px; }
        .nav-link { color: var(--muted); text-decoration: none; padding: 8px 16px; border-radius: 6px; transition: all 0.2s; }
        .nav-link:hover { background: rgba(96,165,250,.1); color: var(--text); }
        .container { max-width: 1200px; margin: 0 auto; padding: 24px; }
        h1 { font-size: 1.8rem; font-weight: 800; margin-bottom: 24px; }
        h2 { font-size: 1.4rem; font-weight: 700; color: var(--text); margin-bottom: 16px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; text-align: center; }
        .stat-number { font-size: 2rem; font-weight: 800; color: var(--blue-light); margin-bottom: 4px; }
        .stat-label { font-size: .85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--border); }
        th { background: var(--header); font-weight: 600; color: var(--muted); font-size: .85rem; text-transform: uppercase; }
        tr:hover { background: rgba(96, 165, 250, .05); }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <div className="container">
        <header>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Link href="/" className="logo"><span className="logo-mark">▶</span> PodStream</Link>
          </div>
          <span className="tag">Admin Dashboard</span>
        </header>

        <h2>Overview</h2>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-number">1,247</div><div className="stat-label">Total Votes</div></div>
          <div className="stat-card"><div className="stat-number">4</div><div className="stat-label">Nominees</div></div>
          <div className="stat-card"><div className="stat-number">28</div><div className="stat-label">Submissions</div></div>
          <div className="stat-card"><div className="stat-number">Live</div><div className="stat-label">Status</div></div>
        </div>

        <h2>Recent Submissions</h2>
        <div className="table-container">
          <table>
            <thead><tr><th>ID</th><th>Username</th><th>Method</th><th>IP</th><th>Country</th><th>Date</th></tr></thead>
            <tbody>
              <tr><td>#001</td><td>user123</td><td>Instagram</td><td>192.168.1.1</td><td>Nigeria</td><td>2026-01-15</td></tr>
              <tr><td>#002</td><td>voter456</td><td>Email</td><td>192.168.1.2</td><td>Ghana</td><td>2026-01-15</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
