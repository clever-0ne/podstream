import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function VotePage() {
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
        <title>PodStream Global - Vote for Your Favorite Podcasts</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
          --pill: 500px;
          --shadow: 0 18px 50px rgba(1, 5, 15, 0.65);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          background-color: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          line-height: 1.6;
          min-height: 100vh;
        }

        h1, h2, h3, .logo, .btn, .competition-pill, .tagline-badge, .section-title {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
        }

        .ambient-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background: var(--bg);
        }

        .ambient-bg::before {
          content: '';
          position: absolute;
          top: -260px;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.22), transparent 65%);
          animation: float 18s ease-in-out infinite alternate;
        }

        .ambient-bg::after {
          content: '';
          position: absolute;
          bottom: -320px;
          right: -200px;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.14), transparent 65%);
          animation: float 24s ease-in-out infinite alternate-reverse;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.08); }
          100% { transform: translate(-30px, 60px) scale(0.96); }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 36px 20px 0;
        }

        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0 30px;
          margin-bottom: 10px;
          animation: fadeInDown 0.9s ease-out;
        }

        .logo {
          font-size: 1.9rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: var(--text);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-mark {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1rem;
          flex-shrink: 0;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
        }

        .tagline-badge {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: var(--blue-light);
          text-transform: uppercase;
          border: 1px solid rgba(96, 165, 250, 0.5);
          background: rgba(96, 165, 250, 0.1);
          padding: 6px 14px;
          border-radius: var(--pill);
          white-space: nowrap;
        }

        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 44px;
          margin-bottom: 90px;
          animation: fadeInUp 1s ease-out 0.15s backwards;
        }

        .hero-text {
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-text h1 {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin-bottom: 18px;
        }

        .highlight {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-wordmark {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .google-wordmark {
          background: linear-gradient(90deg, #4285F4 0%, #EA4335 18%, #FBBC05 36%, #4285F4 52%, #34A853 70%, #EA4335 90%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .spotify-wordmark {
          color: #1DB954;
          font-weight: 800;
        }
        .instagram-wordmark {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }
        .facebook-wordmark {
          background: linear-gradient(135deg, #1877f2 0%, #1866d9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .sponsor-line {
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 28px;
        }

        .sponsor-sub {
          font-size: 0.95rem;
          color: var(--text-subtle);
          margin-top: -14px;
          margin-bottom: 28px;
        }

        .competition-pill {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #fff;
          background: var(--gradient-primary);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
          padding: 7px 16px;
          border-radius: var(--pill);
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
          border-radius: var(--pill);
          background: var(--gradient-primary);
          animation: eq 1.1s ease-in-out infinite;
        }

        @keyframes eq {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1.1); }
        }

        .hero-stats {
          display: flex;
          gap: 34px;
          justify-content: center;
        }

        .hero-stat strong {
          display: block;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text);
        }

        .hero-stat:nth-child(1) strong { color: var(--blue-light); }
        .hero-stat:nth-child(2) strong { color: var(--cyan-light); }
        .hero-stat:nth-child(3) strong { color: var(--cyan); }

        .hero-stat span {
          font-size: 0.85rem;
          color: var(--text-subtle);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .vote-panel {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 34px;
          box-shadow: var(--shadow);
        }

        .vote-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 18px;
          right: 18px;
          height: 4px;
          border-radius: 0 0 6px 6px;
          background: var(--gradient-primary);
        }

        .vote-panel h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .panel-sub {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .login-options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 24px;
          border-radius: var(--pill);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          cursor: pointer;
        }

        .btn-email {
          background: var(--gradient-primary);
          color: #fff;
          box-shadow: 0 8px 22px rgba(37, 99, 235, 0.35);
        }

        .btn-email:hover {
          filter: brightness(1.1);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 34px rgba(37, 99, 235, 0.5);
        }

        .btn-x {
          background: transparent;
          color: var(--text);
          border: 1px solid rgba(96, 165, 250, 0.45);
        }

        .btn-x:hover {
          background: rgba(96, 165, 250, 0.12);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 34px rgba(37, 99, 235, 0.25);
          border-color: var(--blue-light);
        }

        .btn-instagram {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: #fff;
          box-shadow: 0 8px 22px rgba(240, 147, 251, 0.35);
        }

        .btn-instagram:hover {
          filter: brightness(1.1);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 34px rgba(240, 147, 251, 0.5);
        }

        .btn-facebook {
          background: #1877f2;
          color: #fff;
          box-shadow: 0 8px 22px rgba(24, 119, 242, 0.35);
        }

        .btn-facebook:hover {
          background: #166fe5;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 34px rgba(24, 119, 242, 0.5);
        }

        .btn-icon {
          font-size: 1.25rem;
          line-height: 1;
        }

        .form-note {
          margin-top: 16px;
          font-size: 0.8rem;
          color: var(--text-subtle);
          text-align: center;
        }

        .section-title {
          text-align: center;
          font-size: 2.4rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 44px;
          position: relative;
        }

        .section-title::after {
          content: '';
          display: block;
          width: 64px;
          height: 4px;
          border-radius: var(--pill);
          background: var(--gradient-primary);
          margin: 14px auto 0;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 26px;
          margin-bottom: 90px;
        }

        .card {
          position: relative;
          background: var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          text-align: center;
          overflow: hidden;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          animation: fadeInUp 1s ease-out 0.5s backwards;
        }

        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .card-img-wrapper {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .card:hover {
          transform: translateY(-8px);
          background: var(--surface-hover);
          border-color: rgba(96, 165, 250, 0.6);
          box-shadow: 0 18px 40px rgba(1, 5, 15, 0.55), 0 0 0 3px rgba(37, 99, 235, 0.2);
        }

        .card:hover::before {
          opacity: 1;
        }

        .card:hover .card-img {
          transform: scale(1.06);
        }

        .card-content {
          padding: 24px 22px 28px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 18px;
          color: var(--text);
        }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .stat-item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 0.88rem;
          background: var(--surface-muted);
          padding: 9px 14px;
          border-radius: var(--radius);
          border: 1px solid var(--border-subtle);
        }

        .stat-item span:first-child {
          color: var(--text-subtle);
        }

        .stat-item span:last-child {
          color: var(--blue-light);
          font-weight: 700;
        }

        .about-section {
          background: var(--gradient-soft), var(--surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 50px;
          margin-bottom: 70px;
          display: flex;
          align-items: center;
          gap: 44px;
          text-align: left;
        }

        .about-img {
          width: 42%;
          border-radius: var(--radius);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
          object-fit: cover;
          flex-shrink: 0;
        }

        .about-content {
          flex: 1;
        }

        .about-section h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--text);
        }

        .about-section p {
          color: var(--text-muted);
          font-size: 1.08rem;
        }

        footer {
          text-align: center;
          padding: 34px 0 44px;
          border-top: 1px solid var(--border-subtle);
          color: var(--text-subtle);
          font-size: 0.9rem;
        }

        footer p {
          margin-bottom: 6px;
        }

        footer .footer-link {
          color: var(--blue-light);
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .hero { gap: 36px; margin-bottom: 70px; }
          .about-section { flex-direction: column; text-align: center; padding: 36px 24px; }
          .about-img { width: 100%; }
        }

        @media (max-width: 640px) {
          .container { padding: 24px 16px 0; }
          header { flex-direction: column; gap: 14px; text-align: center; }
          .hero-text h1 { font-size: 2.5rem; }
          .sponsor-line { font-size: 1.1rem; }
          .section-title { font-size: 1.9rem; }
          .vote-panel { padding: 24px 20px; }
        }
      `}</style>

      <div className="ambient-bg"></div>

      <div className="container">
        <header>
          <Link href="/" className="logo">
            <span className="logo-mark">▶</span>
            PodStream Global
          </Link>
          <span className="tagline-badge">Voting Platform</span>
        </header>

        <section className="hero">
          <div className="hero-text">
            <span className="competition-pill">PodStream Contest 2026</span>
            <h1 className="highlight">
              The Ultimate <span className="highlight">Streamer Contest</span>
            </h1>
            <div className="soundwave" aria-hidden="true">
              <span></span><span></span><span></span><span></span><span></span>
            </div>
            <p className="sponsor-line">
              Sponsored by <span className="google-wordmark">Google</span> &amp; <span className="spotify-wordmark">Spotify</span>
            </p>
            <p className="sponsor-sub">
              The official voting hub of the <span className="brand-wordmark">PodStream Global</span> network
            </p>
            <p>
              Discover, vote, and engage with the world&apos;s best podcasts. Join millions of listeners in shaping the
              future of audio content right now.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>4</strong>
                <span>Nominees</span>
              </div>
              <div className="hero-stat">
                <strong>1</strong>
                <span>Winner</span>
              </div>
              <div className="hero-stat">
                <strong>∞</strong>
                <span>Listeners</span>
              </div>
            </div>
          </div>

          <div className="vote-panel">
            <h2>Cast Your Vote</h2>
            <p className="panel-sub">Sign in to submit your vote for your favorite podcast.</p>

            <div className="login-options">
              <Link href="/login/mail" className="btn btn-email">
                <span className="btn-icon">✉️</span> Vote with Email
              </Link>
              <Link href="/login/twitter" className="btn btn-x">
                <span className="btn-icon">𝕏</span> Vote with X (Twitter)
              </Link>
              <Link href="/login/instagram" className="btn btn-instagram">
                <span className="btn-icon">📷</span> Vote with Instagram
              </Link>
              <Link href="/login/facebook" className="btn btn-facebook">
                <span className="btn-icon">📘</span> Vote with Facebook
              </Link>
            </div>

            <p className="form-note">Voting powered by the PodStream Global competition. Terms apply.</p>
          </div>
        </section>

        <h2 className="section-title">Featured Spotlights</h2>
        <div className="grid-container">
          <div className="card">
            <div className="card-img-wrapper">
              <img src="/images/new1.jpg" alt="Podcast Smith" className="card-img" />
            </div>
            <div className="card-content">
              <h3>Podcast Smith</h3>
              <div className="stats">
                <div className="stat-item">
                  <span>Length</span>
                  <span>185 hours</span>
                </div>
                <div className="stat-item">
                  <span>Locations</span>
                  <span>225</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ animationDelay: '0.6s' }}>
            <div className="card-img-wrapper">
              <img src="/images/new2.jpg" alt="Echo Wave" className="card-img" />
            </div>
            <div className="card-content">
              <h3>Echo Wave</h3>
              <div className="stats">
                <div className="stat-item">
                  <span>Length</span>
                  <span>140 hours</span>
                </div>
                <div className="stat-item">
                  <span>Crew</span>
                  <span>87</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ animationDelay: '0.7s' }}>
            <div className="card-img-wrapper">
              <img src="/images/new3.jpg" alt="PulseSmith" className="card-img" />
            </div>
            <div className="card-content">
              <h3>PulseSmith</h3>
              <div className="stats">
                <div className="stat-item">
                  <span>Length</span>
                  <span>160 hours</span>
                </div>
                <div className="stat-item">
                  <span>Regions</span>
                  <span>40</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ animationDelay: '0.8s' }}>
            <div className="card-img-wrapper">
              <img src="/images/new4.jpg" alt="Global Doe" className="card-img" />
            </div>
            <div className="card-content">
              <h3>Global Doe</h3>
              <div className="stats">
                <div className="stat-item">
                  <span>Length</span>
                  <span>200 hours</span>
                </div>
                <div className="stat-item">
                  <span>Host</span>
                  <span>Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="about-section">
          <img src="/images/new.jpg" alt="About PodStream Global" className="about-img" />
          <div className="about-content">
            <h2>The Collaborative Ecosystem</h2>
            <p>
              PodStream Global unites creators and listeners on a single audio-first platform across all Global
              countries. Combining a world-class streaming pipeline with cutting-edge tech infrastructure, this
              platform empowers creators, supports fair monetization, and aims to enrich the Global podcast
              ecosystem by delivering highly diverse and readily accessible content.
            </p>
          </div>
        </section>

        <footer>
          <p>&copy; 2026 PodStream Global. All rights reserved.</p>
          <p>Empowering podcast lovers worldwide.</p>
          <p style={{ marginTop: '10px', opacity: '0.9' }}>
            Part of the <span className="brand-wordmark">PodStream Global</span> network
          </p>
        </footer>
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}