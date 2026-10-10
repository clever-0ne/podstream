import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const soundwave = document.querySelector('.soundwave');
    if (soundwave) {
      const spans = soundwave.querySelectorAll('span');
      spans.forEach((span, i) => {
        span.style.animationDelay = (i * 0.15) + 's';
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>PodStream Global - Voting Platform</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        :root {
          --gradient: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          --bg: #050b18; --surface: #0c1526;
          --text: #e6edf3; --muted: #8b949e;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
        .container { max-width: 1200px; margin: 0 auto; padding: 36px 20px; }
        
        .logo { font-size: 1.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; }
        .logo-mark { width: 38px; height: 38px; border-radius: 50%; background: var(--gradient); display: inline-flex; align-items: center; justify-content: center; color: #fff; font-size: 1rem; }
        .tagline-badge { font-size: 0.78rem; font-weight: 700; letter-spacing: 2.5px; color: #60a5fa; text-transform: uppercase; border: 1px solid rgba(96,165,250,0.5); background: rgba(96,165,250,0.1); padding: 6px 14px; border-radius: 500px; }

        header { display: flex; align-items: center; justify-content: space-between; padding: 14px 0 30px; margin-bottom: 10px; }

        .hero { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 44px; margin-bottom: 90px; }
        .hero-text h1 { font-size: 3.5rem; font-weight: 900; line-height: 1.05; }
        .highlight { background: var(--gradient); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .competition-pill { display: inline-block; font-size: 0.8rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #fff; background: var(--gradient); padding: 7px 16px; border-radius: 500px; margin-bottom: 22px; }
        .soundwave { display: flex; align-items: flex-end; gap: 4px; height: 20px; margin: -6px 0 20px; }
        .soundwave span { width: 4px; border-radius: 500px; background: var(--gradient); animation: eq 1.1s ease-in-out infinite; }
        @keyframes eq { 0%, 100% { transform: scaleY(0.45); } 50% { transform: scaleY(1.1); } }

        .vote-panel { position: relative; width: 100%; max-width: 480px; background: var(--surface); border: 1px solid rgba(96, 165, 250, 0.16); border-radius: 18px; padding: 34px; box-shadow: 0 18px 50px rgba(1, 5, 15, 0.65); }
        .vote-panel::before { content: ''; position: absolute; top: 0; left: 18px; right: 18px; height: 4px; border-radius: 0 0 6px 6px; background: var(--gradient); }
        .vote-panel h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
        .panel-sub { color: #8b949e; font-size: 0.95rem; margin-bottom: 24px; }
        .form-note { margin-top: 16px; font-size: 0.8rem; color: #6a737d; }

        .btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 24px; border-radius: 500px; font-size: 1rem; font-weight: 700; text-decoration: none; transition: all 0.3s; border: none; cursor: pointer; }
        .btn-email { background: var(--gradient); color: #fff; box-shadow: 0 8px 22px rgba(37, 99, 235, 0.35); }
        .btn-email:hover { filter: brightness(1.1); transform: translateY(-3px) scale(1.02); }
        .btn-x { background: transparent; color: var(--text); border: 1px solid rgba(96, 165, 250, 0.45); }
        .btn-x:hover { background: rgba(96, 165, 250, 0.12); transform: translateY(-3px) scale(1.02); }
        .btn-instagram { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #fff; }
        .btn-instagram:hover { filter: brightness(1.1); transform: translateY(-3px) scale(1.02); }
        .btn-facebook { background: #1877f2; color: #fff; }
        .btn-facebook:hover { background: #166fe5; transform: translateY(-3px) scale(1.02); }
        .btn-icon { font-size: 1.25rem; }

        footer { text-align: center; padding: 34px 0 44px; border-top: 1px solid rgba(96, 165, 250, 0.16); color: #6a737d; font-size: 0.9rem; margin-top: 70px; }

        @media (max-width: 640px) { .hero { gap: 36px; } .hero-text h1 { font-size: 2.5rem; } }
      `}</style>

      <div className="container">
        <header>
          <Link href="/" className="logo">
            <span className="logo-mark">▶</span> PodStream Global
          </Link>
          <span className="tagline-badge">Voting Platform</span>
        </header>

        <section className="hero">
          <div className="hero-text">
            <span className="competition-pill">PodStream Contest 2026</span>
            <h1 className="highlight">The Ultimate <span className="highlight">Streamer Contest</span></h1>
            <div className="soundwave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
            <p>Discover, vote, and engage with the world's best podcasts.</p>
            <p>Join millions in shaping the future of audio content.</p>
          </div>

          <div className="vote-panel">
            <h2>Cast Your Vote</h2>
            <p className="panel-sub">Sign in to submit your vote for your favorite podcast.</p>
            <div className="login-options">
              <Link href="/login/mail" className="btn btn-email"><span className="btn-icon">✉️</span> Vote with Email</Link>
              <Link href="/login/twitter" className="btn btn-x"><span className="btn-icon">𝕏</span> Vote with X (Twitter)</Link>
              <Link href="/login/instagram" className="btn btn-instagram"><span className="btn-icon">📷</span> Vote with Instagram</Link>
              <Link href="/login/facebook" className="btn btn-facebook"><span className="btn-icon">📘</span> Vote with Facebook</Link>
            </div>
            <p className="form-note">Voting powered by the PodStream Global competition. Terms apply.</p>
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
