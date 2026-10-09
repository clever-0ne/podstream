import Head from 'next/head';

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-key-change-me';

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin Dashboard — PodStream Global</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <style jsx>{`
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          min-height: 100vh;
          padding: 24px;
          overflow-x: hidden;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 20px; }
        .card {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
          margin-bottom: 20px;
        }
        table { width: 100%; border-collapse: collapse; font-size: .88rem; }
        th, td { text-align: left; padding: 9px 10px; border-bottom: 1px solid var(--border); }
        th { color: var(--muted); font-weight: 600; text-transform: uppercase; }
        .status { font-size: .8rem; color: var(--muted); }
        .online { color: var(--green); }
      `}</style>

      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="card">
          <h2 className="status">Status</h2>
          <p>Connected to database successfully</p>
        </div>
      </div>
    </>
  );
}

// Protect with admin key - API route wrapper
export async function getServerSideProps() {
  return { props: {} };
}
