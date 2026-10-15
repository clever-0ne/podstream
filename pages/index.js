import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);
  const animationRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const replayAnimation = () => {
    if (animationRef.current) {
      animationRef.current.restart();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PodStream Global — The Ultimate Streamer Contest</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --blue: #2563eb;
          --blue-deep: #1e40af;
          --blue-light: #60a5fa;
          --cyan: #06b6d4;
          --cyan-light: #67e8f9;
          --gradient-primary: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          --gradient-soft: linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(6, 182, 212, 0.12));
          --bg: #050b18;
          --surface: #0c1526;
          --surface-hover: #111c30;
          --surface-muted: #08101f;
          --border-subtle: rgba(96, 165, 250, 0.16);
          --text: #eaf2ff;
          --text-muted: #9fb6d8;
          --text-subtle: #6b85ad;
          --radius: 8px;
          --radius-lg: 18px;
          --shadow: 0 18px 50px rgba(1, 5, 15, 0.65);
          --max-width: 1100px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .container {
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
          padding: 0 24px;
        }

        .ambient-bg {
          position: fixed;
          inset: 0;
          z-index: -2;
          overflow: hidden;
        }
        .ambient-bg::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.22), transparent 65%);
          animation: float 20s ease-in-out infinite alternate;
        }
        .ambient-bg::after {
          content: '';
          position: absolute;
          bottom: -300px;
          right: -150px;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.14), transparent 65%);
          animation: float 24s ease-in-out infinite alternate-reverse;
        }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.08); }
          100% { transform: translate(-25px, 60px) scale(0.96); }
        }

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 14px 0 30px;
          gap: 12px;
        }

        .logo {
          font-size: 1.9rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
          text-decoration: none;
        }
        .logo-mark {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .logo-mark:hover { transform: scale(1.1); }
        .tagline-badge {
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: var(--blue-light);
          text-transform: uppercase;
          border: 1px solid rgba(96,165,250,.5);
          background: rgba(96,165,250,.1);
          padding: 6px 14px;
          border-radius: 500px;
        }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 44px;
          margin-top: 50px;
          width: 100%;
        }

        .hero-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          width: 100%;
          max-width: 720px;
        }

        .hero-text h1 {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 18px;
        }

        .highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pill {
          display: inline-block;
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #fff;
          background: var(--gradient-primary);
          padding: 7px 16px;
          border-radius: 500px;
          margin-bottom: 22px;
        }

        .soundwave {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 20px;
          margin: -6px 0 20px;
        }
        .soundwave span {
          width: 4px;
          height: 8px;
          border-radius: 500px;
          background: var(--gradient-primary);
          animation: eq 1.1s ease-in-out infinite;
        }
        @keyframes eq { 0%,100%{transform:scaleY(.45)} 50%{transform:scaleY(1.1)} }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 24px;
          border-radius: 500px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .btn:hover { opacity: 0.9; }
        .btn-email { background: var(--gradient-primary); color: #fff; }
        .btn-x { background: transparent; color: var(--text); border: 1px solid var(--border-subtle); }
        .btn-instagram { background: linear-gradient(135deg, #feda75 0%, #d62976 45%, #962fbf 75%, #4f5bd5 100%); color: #fff; }
        .btn-facebook { background: #1877f2; color: #fff; }

        .vote-panel {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          padding: 34px;
          box-shadow: var(--shadow);
          margin: 0 auto;
        }
        .vote-panel::before {
          content:'';
          position: absolute;
          top: 0;
          left: 18px;
          right: 18px;
          height: 4px;
          border-radius: 0 0 6px 6px;
          background: var(--gradient-primary);
        }
        .vote-panel h2 { margin-bottom: 16px; font-size: 1.5rem; }
        .vote-panel p { font-size: .95rem; color: var(--text-muted); margin-bottom: 16px; }
        .vote-panel .btn-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }

        footer {
          text-align: center;
          padding: 34px 0 44px;
          border-top: 1px solid var(--border-subtle);
          color: var(--text-subtle);
          margin-top: 90px;
        }

        .section-title {
          text-align: center;
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 90px 0 44px;
          position: relative;
        }
        .section-title::after {
          content: '';
          display: block;
          width: 64px;
          height: 4px;
          border-radius: 500px;
          background: var(--gradient-primary);
          margin: 14px auto 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 26px;
          margin-bottom: 90px;
          width: 100%;
          max-width: var(--max-width);
          margin-left: auto;
          margin-right: auto;
        }

        .feature-card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          text-align: center;
          overflow: hidden;
          transition: all 0.35s;
          animation: fadeInUp 1s ease-out 0.5s backwards;
        }

        .feature-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .feature-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .feature-content {
          padding: 24px 22px 28px;
        }
        .feature-content h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 18px;
          color: var(--text);
        }
        .feature-stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }
        .stat-row {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: .88rem;
          background: var(--surface-muted);
          padding: 9px 14px;
          border-radius: 8px;
          border: 1px solid var(--border-subtle);
        }
        .stat-row span:first-child { color: var(--text-subtle); }
        .stat-row span:last-child { color: var(--blue-light); font-weight: 700; }

        .about-section {
          display: flex;
          align-items: center;
          gap: 44px;
          text-align: left;
          padding: 50px;
          border: 1px solid var(--border-subtle);
          border-radius: 18px;
          margin-bottom: 70px;
          background: var(--surface);
          width: 100%;
          max-width: var(--max-width);
          margin-left: auto;
          margin-right: auto;
        }
        .about-image {
          flex: 1;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        }
        .about-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .about-content {
          flex: 1;
        }
        .about-content h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--text);
        }
        .about-content p {
          color: var(--text-muted);
          font-size: 1.08rem;
          line-height: 1.8;
        }

        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          .hero {
            margin-top: 30px;
            gap: 30px;
          }
          .hero-text h1 { font-size: 2.8rem; }
          .vote-panel { padding: 24px 20px; }
          .btn { padding: 12px 20px; font-size: 0.95rem; }
          .section-title { margin: 70px 0 34px; }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .about-section {
            flex-direction: column;
            text-align: center;
            padding: 36px 24px;
          }
          .about-section img {
            width: 100%;
            max-width: 500px;
          }
          .about-content { flex: 1; }
        }

        @media (max-width: 480px) {
          .hero-text h1 { font-size: 2.2rem; }
          .pill { padding: 6px 14px; }
          .soundwave { height: 16px; }
          .soundwave span { width: 3px; height: 6px; }
          .features-grid { grid-template-columns: 1fr; }
          header { gap: 8px; }
          .logo { font-size: 1.6rem; }
        }
      `}</style>

      <div className="ambient-bg"></div>

      <div className="container">
        <header>
          <Link href="/" className="logo">
            <span className="logo-mark" onClick={replayAnimation}>▶</span>
            PodStream Global
          </Link>
          <span className="tagline-badge">Voting Platform</span>
        </header>

        <section className="hero">
          <div className="hero-text">
            <span className="pill">PodStream Contest 2026</span>
            <h1 className="highlight">The Ultimate <span className="highlight">Streamer Contest</span></h1>
            <div className="soundwave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
            <p>Sponsored by <span style={{background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 18%, #FBBC05 36%, #4285F4 52%, #34A853 70%, #EA4335 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800}}>Google</span> & <span style={{color: '#1DB954', fontWeight: 800}}>Spotify</span></p>
            <p>Discover, vote, and engage with the world's best podcasts. Join millions in shaping the future of audio content.</p>
            <div style={{display: 'flex', gap: '34px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <div><strong>4</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Nominees</span></div>
              <div><strong>1</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Winner</span></div>
              <div><strong>∞</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Listeners</span></div>
            </div>
          </div>

          <div className="vote-panel">
            <h2>Cast Your Vote</h2>
            <p>Sign in to submit your vote for your favorite podcast.</p>
            <div className="btn-group" style={{flexDirection: 'column', alignItems: 'center'}}>
              <Link href="/login/mail" className="btn btn-email" style={{width: '100%', maxWidth: '320px'}}>✉️ Vote with Email</Link>
              <Link href="/login/facebook" className="btn btn-facebook" style={{width: '100%', maxWidth: '320px'}}>f Facebook</Link>
              <Link href="/login/instagram" className="btn btn-instagram" style={{width: '100%', maxWidth: '320px'}}>📸 Instagram</Link>
              <Link href="/login/twitter" className="btn btn-x" style={{width: '100%', maxWidth: '320px'}}>✕ X (Twitter)</Link>
            </div>
            <p style={{fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 16, textAlign: 'center'}}>Voting powered by the PodStream Global competition. Terms apply.</p>
          </div>
        </section>

        <h2 className="section-title">Featured Spotlights</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/new1.jpg" alt="Podcast Smith" />
            </div>
            <div className="feature-content">
              <h3>Podcast Smith</h3>
              <div className="feature-stats">
                <div className="stat-row"><span>Length</span><span>185 hours</span></div>
                <div className="stat-row"><span>Locations</span><span>225</span></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/new2.jpg" alt="Echo Wave" />
            </div>
            <div className="feature-content">
              <h3>Echo Wave</h3>
              <div className="feature-stats">
                <div className="stat-row"><span>Length</span><span>140 hours</span></div>
                <div className="stat-row"><span>Crew</span><span>87</span></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/new3.jpg" alt="PulseSmith" />
            </div>
            <div className="feature-content">
              <h3>PulseSmith</h3>
              <div className="feature-stats">
                <div className="stat-row"><span>Length</span><span>160 hours</span></div>
                <div className="stat-row"><span>Regions</span><span>40</span></div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/new4.jpg" alt="Global Doe" />
            </div>
            <div className="feature-content">
              <h3>Global Doe</h3>
              <div className="feature-stats">
                <div className="stat-row"><span>Length</span><span>200 hours</span></div>
                <div className="stat-row"><span>Host</span><span>Global</span></div>
              </div>
            </div>
          </div>
        </div>

        <section className="about-section">
          <div className="about-image">
            <img src="/images/new.jpg" alt="About PodStream Global" />
          </div>
          <div className="about-content">
            <h2>The Collaborative Ecosystem</h2>
            <p>PodStream Global unites creators and listeners on a single audio-first platform across all Global countries. Combining a world-class streaming pipeline with cutting-edge tech infrastructure, this platform empowers creators, supports fair monetization, and aims to enrich the Global podcast ecosystem by delivering highly diverse and readily accessible content.</p>
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