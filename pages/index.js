import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PodStream Global — The Ultimate Streamer Contest</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --blue: #2563eb; --blue-deep: #1e40af; --blue-light: #60a5fa;
          --cyan: #06b6d4; --cyan-light: #67e8f9;
          --gradient-primary: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          --gradient-soft: linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(6, 182, 212, 0.12));
          --bg: #050b18; --surface: #0c1526; --surface-hover: #111c30;
          --surface-muted: #08101f; --border-subtle: rgba(96, 165, 250, 0.16);
          --text: #eaf2ff; --text-muted: #9fb6d8; --text-subtle: #6b85ad;
          --radius: 8px; --radius-lg: 18px; --shadow: 0 18px 50px rgba(1, 5, 15, 0.65);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; overflow-x: hidden; }
        .logo { font-size: 1.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; color: var(--text); text-decoration: none; }
        .logo-mark { width: 38px; height: 38px; border-radius: 50%; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: #fff; }
        .tagline-badge { font-size: .78rem; font-weight: 700; letter-spacing: 2.5px; color: var(--blue-light); text-transform: uppercase; border: 1px solid rgba(96,165,250,.5); background: rgba(96,165,250,.1); padding: 6px 14px; border-radius: 500px; }
        header { display: flex; align-items: center; justify-content: space-between; padding: 14px 0 30px; }
        .hero { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 44px; margin-top: 50px; }
        .hero-text h1 { font-size: 4rem; font-weight: 900; line-height: 1.05; margin-bottom: 18px; }
        .highlight { background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .pill { display: inline-block; font-size: .8rem; font-weight: 700; letter-spacing: 2px; color: #fff; background: var(--gradient-primary); padding: 7px 16px; border-radius: 500px; margin-bottom: 22px; }
        .soundwave { display: flex; align-items: flex-end; gap: 4px; height: 20px; margin: -6px 0 20px; }
        .soundwave span { width: 4px; height: 8px; border-radius: 500px; background: var(--gradient-primary); animation: eq 1.1s ease-in-out infinite; }
        @keyframes eq { 0%,100%{transform:scaleY(.45)} 50%{transform:scaleY(1.1)} }
        .btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 24px; border-radius: 500px; font-size: 1rem; font-weight: 700; text-decoration: none; cursor: pointer; }
        .btn-email { background: var(--gradient-primary); color: #fff; }
        .btn-x { background: transparent; color: var(--text); border: 1px solid var(--border-subtle); }
        .btn-instagram { background: linear-gradient(135deg, #feda75 0%, #d62976 45%, #962fbf 75%, #4f5bd5 100%); color: #fff; }
        .btn-facebook { background: #1877f2; color: #fff; }
        .vote-panel { position: relative; width: 100%; max-width: 480px; background: var(--surface); border: 1px solid var(--border-subtle); border-radius: 18px; padding: 34px; box-shadow: var(--shadow); }
        .vote-panel::before { content:''; position:absolute; top:0; left:18px; right:18px; height:4px; border-radius:0 0 6px 6px; background:var(--gradient-primary); }
        footer { text-align: center; padding: 34px 0 44px; border-top: 1px solid var(--border-subtle); color: var(--text-subtle); }
      `}</style>

      <div className="container">
        <header>
          <Link href="/" className="logo"><span className="logo-mark">▶</span> PodStream Global</Link>
          <span className="tagline-badge">Voting Platform</span>
        </header>

        <section className="hero">
          <div className="hero-text">
            <span className="pill">PodStream Contest 2026</span>
            <h1 className="highlight">The Ultimate <span className="highlight">Streamer Contest</span></h1>
            <div className="soundwave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
            <p>Sponsored by <span style={{background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 18%, #FBBC05 36%, #4285F4 52%, #34A853 70%, #EA4335 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800}}>Google</span> & <span style={{color: '#1DB954', fontWeight: 800}}>Spotify</span></p>
            <p>Discover, vote, and engage with the world'''s best podcasts. Join millions in shaping the future of audio content.</p>
            <div style={{display: 'flex', gap: '34px', justifyContent: 'center', marginTop: 20}}>
              <div><strong>4</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Nominees</span></div>
              <div><strong>1</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Winner</span></div>
              <div><strong>∞</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Listeners</span></div>
            </div>
          </div>

          <div className="vote-panel">
            <h2>Cast Your Vote</h2>
            <p>Sign in to submit your vote for your favorite podcast.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 16}}>
              <Link href="/login/mail" className="btn btn-email">✉️ Vote with Email</Link>
              <Link href="/login/twitter" className="btn btn-x">𝕏 Vote with X (Twitter)</Link>
              <Link href="/login/instagram" className="btn btn-instagram">📸 Vote with Instagram</Link>
              <Link href="/login/facebook" className="btn btn-facebook">👍 Vote with Facebook</Link>
            </div>
            <p style={{fontSize: '.8rem', color: 'var(--text-subtle)', marginTop: 16, textAlign: 'center'}}>Voting powered by the PodStream Global competition. Terms apply.</p>
          </div>
        </section>

        <footer>
          <p>&copy; 2026 PodStream Global. All rights reserved.</p>
          <p>Empowering podcast lovers worldwide.</p>
        </footer>
      </div>
    </>
  );
}
