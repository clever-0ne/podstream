import Head from 'next/head';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function Home() {
  const tl = useRef(null);

  useEffect(() => {
    tl.current = gsap.timeline({ delay: 0.3 });
    
    tl.current.from('.animate-element', {
      opacity: 0,
      y: 40,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.to('.glow-effect', {
      scale: 1.2,
      opacity: 0.3,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: 'sine.inOut'
    });

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, []);

  const replayAnimation = () => {
    if (tl.current) {
      tl.current.restart();
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <title>PodStream Global — The Ultimate Streamer Contest</title>
        <link rel="icon" type="image/x-icon" href="/logos/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --blue: #2563eb; --cyan: #06b6d4; --gradient-primary: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          --bg: #050b18; --surface: #0c1526; --border-subtle: rgba(96, 165, 250, 0.16);
          --text: #eaf2ff; --text-muted: #9fb6d8; --text-subtle: #6b85ad;
          --shadow: 0 18px 50px rgba(1, 5, 15, 0.65);
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

        .ambient-bg { position: fixed; inset: 0; z-index: -2; overflow: hidden; }
        .ambient-bg::before, .ambient-bg::after {
          content: ''; position: absolute; border-radius: 50%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.22), transparent 65%);
          filter: blur(80px);
        }
        .ambient-bg::before {
          top: -200px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 800px;
          animation: float 20s ease-in-out infinite alternate;
        }
        .ambient-bg::after {
          bottom: -300px; right: -150px;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.14), transparent 65%);
          animation: float 24s ease-in-out infinite alternate-reverse;
        }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.08); }
          100% { transform: translate(-25px, 60px) scale(0.96); }
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        header { display: flex; align-items: center; justify-content: space-between; padding: 14px 0 30px; }

        .branding { display: flex; align-items: center; gap: 12px; }

        .play-icon {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; position: relative; overflow: hidden;
          flex-shrink: 0; transition: transform 0.2s, box-shadow 0.2s;
        }
        .play-icon:hover { transform: scale(1.08); box-shadow: 0 0 20px rgba(37, 99, 235, 0.4); }
        .play-icon:active { transform: scale(0.95); }
        .play-icon::before {
          content: ''; position: absolute;
          width: 60px; height: 60px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%);
          animation: pulseBeat 1.2s ease-out infinite;
        }
        @keyframes pulseBeat {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .play-icon svg { width: 20px; height: 20px; fill: white; }

        .logo-link {
          font-size: 1.9rem; font-weight: 900; color: var(--text);
          text-decoration: none; display: flex; align-items: center; gap: 10px;
        }
        .logo-mark {
          width: 38px; height: 38px; border-radius: 50%;
          background: var(--gradient-primary); display: flex;
          align-items: center; justify-content: center; color: #fff;
        }
        .tagline-badge {
          font-size: .78rem; font-weight: 700; letter-spacing: 2.5px;
          color: var(--blue-light); text-transform: uppercase;
          border: 1px solid rgba(96, 165, 250,.5); background: rgba(96, 165, 250,.1);
          padding: 6px 14px; border-radius: 500px;
        }

        .hero { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 44px; margin-top: 50px; }
        .hero-text h1 { font-size: 4rem; font-weight: 900; line-height: 1.05; margin-bottom: 18px; background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .highlight-blue { background: var(--gradient-primary); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .pill { display: inline-block; font-size: .8rem; font-weight: 700; letter-spacing: 2px; color: #fff; background: var(--gradient-primary); padding: 7px 16px; border-radius: 500px; margin-bottom: 22px; }
        .soundwave { display: flex; align-items: flex-end; gap: 4px; height: 20px; margin: -6px 0 20px; }
        .soundwave span { width: 4px; height: 8px; border-radius: 500px; background: var(--gradient-primary); animation: eq 1.1s ease-in-out infinite; }
        @keyframes eq { 0%,100%{transform:scaleY(.45)} 50%{transform:scaleY(1.1)} }

        .glow-effect { position: absolute; top: 50%; left: 50%; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent 65%); transform: translate(-50%, -50%); pointer-events: none; }

        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 24px; border-radius: 500px; font-size: 1rem; font-weight: 700; text-decoration: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
        .btn-email { background: var(--gradient-primary); color: #fff; border: none; }
        .btn-x { background: transparent; color: var(--text); border: 1px solid var(--border-subtle); border-radius: 500px; }
        .btn-instagram { background: linear-gradient(135deg, #feda75 0%, #d62976 45%, #962fbf 75%, #4f5bd5 100%); color: #fff; border: none; }
        .btn-facebook { background: #1877f2; color: #fff; border: none; }

        .vote-panel { position: relative; width: 100%; max-width: 480px; background: var(--surface) ; border: 1px solid var(--border-subtle); border-radius: 18px; padding: 34px; box-shadow: var(--shadow); }
        .vote-panel::before { content: ''; position: absolute; top: 0; left: 18px; right: 18px; height: 4px; border-radius: 0 0 6px 6px; background: var(--gradient-primary); }

        footer { text-align: center; padding: 34px 0 44px; border-top: 1px solid var(--border-subtle); color: var(--text-subtle); }

        @media (max-width: 768px) {
          header { flex-direction: column; gap: 16px; text-align: center; }
          .hero { margin-top: 30px; gap: 30px; }
          .hero-text h1 { font-size: 2.8rem; }
          .vote-panel { padding: 24px 20px; }
          .btn { padding: 12px 20px; font-size: 0.95rem; }
          .section-title { font-size: 1.9rem; }
          .about-section { flex-direction: column; text-align: center; padding: 36px 24px; gap: 24px; }
          .about-section img { width: 100%; max-width: 500px; }
        }
        @media (max-width: 480px) {
          .hero-text h1 { font-size: 2.2rem; }
          .pill { padding: 6px 14px; }
          .soundwave { height: 16px; }
          .soundwave span { width: 3px; height: 6px; }
          .section-title { font-size: 1.7rem; margin-bottom: 30px; }
        }
      `}</style>

      <div className="ambient-bg">
        <div className="glow-effect"></div>
      </div>

      <div className="container">
        <header>
          <Link href="/" className="logo-link">
            <div className="play-icon" onClick={replayAnimation}><svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="6,4 6,20 20,12"/></svg></div>
            <span>PodStream Global</span>
          </Link>
          <span className="tagline-badge">Voting Platform</span>
        </header>

        <section className="hero">
          <div className="hero-text">
            <span className="pill animate-element">PodStream Contest 2026</span>
            <h1 className="animate-element">
              The Ultimate <span className="highlight-blue animate-delay-1">Streamer Contest</span>
            </h1>
            <div className="soundwave" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
            <p className="animate-element">
              Sponsored by <span style={{background: 'linear-gradient(90deg, #4285F4 0%, #EA4335 18%, #FBBC05 36%, #4285F4 52%, #34A853 70%, #EA4335 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800}}>Google</span> & <span style={{color: '#1DB954', fontWeight: 800}}>Spotify</span>
            </p>
            <p className="animate-element">Discover, vote, and engage with the worlds best podcasts. Join millions in shaping the future of audio content.</p>
            <div className="stats animate-element" style={{display: 'flex', gap: '34px', justifyContent: 'center', marginTop: 20}}>
              <div><strong className="stat-value" data-count="4">0</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Nominees</span></div>
              <div><strong className="stat-value" data-count="1">0</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Winner</span></div>
              <div><strong className="stat-value" data-count="999999">0</strong><br/><span style={{fontSize: '.85rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '1.5px'}}>Listeners</span></div>
            </div>
          </div>

          <div className="vote-panel">
            <h2>Cast Your Vote</h2>
            <p>Sign in to submit your vote for your favorite podcast.</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 16}}>
              <Link href="/login/mail" className="btn btn-email">Vote with Email</Link>
              <Link href="/login/twitter" className="btn btn-x">Vote with X (Twitter)</Link>
              <Link href="/login/instagram" className="btn btn-instagram">Vote with Instagram</Link>
              <Link href="/login/facebook" className="btn btn-facebook">Vote with Facebook</Link>
            </div>
            <p style={{fontSize: '.8rem', color: 'var(--text-subtle)', marginTop: 16, textAlign: 'center'}}>Voting powered by the PodStream Global competition. Terms apply.</p>
          </div>
        </section>

        <h2 className="section-title">Featured Spotlights</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '26px', marginBottom: '90px'}}>
          <div className="card animate-element">
            <img src="/images/new1.jpg" alt="Podcast Smith" style={{width: '100%', height: '200px', objectFit: 'cover'}} />
            <div style={{padding: '24px 22px 28px'}}>
              <h3 style={{fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text)'}}>Podcast Smith</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)'}}>
                <span style={{color: 'var(--text-subtle)'}}>Length</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>185 hours</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginTop: '8px'}}>
                <span style={{color: 'var(--text-subtle)'}}>Locations</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>225</span>
              </div>
            </div>
          </div>

          <div className="card animate-element">
            <img src="/images/new2.jpg" alt="Echo Wave" style={{width: '100%', height: '200px', objectFit: 'cover'}} />
            <div style={{padding: '24px 22px 28px'}}>
              <h3 style={{fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text)'}}>Echo Wave</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)'}}>
                <span style={{color: 'var(--text-subtle)'}}>Length</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>140 hours</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginTop: '8px'}}>
                <span style={{color: 'var(--text-subtle)'}}>Crew</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>87</span>
              </div>
            </div>
          </div>

          <div className="card animate-element">
            <img src="/images/new3.jpg" alt="PulseSmith" style={{width: '100%', height: '200px', objectFit: 'cover'}} />
            <div style={{padding: '24px 22px 28px'}}>
              <h3 style={{fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text)'}}>PulseSmith</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)'}}>
                <span style={{color: 'var(--text-subtle)'}}>Length</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>160 hours</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginTop: '8px'}}>
                <span style={{color: 'var(--text-subtle)'}}>Regions</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>40</span>
              </div>
            </div>
          </div>

          <div className="card animate-element">
            <img src="/images/new4.jpg" alt="Global Doe" style={{width: '100%', height: '200px', objectFit: 'cover'}} />
            <div style={{padding: '24px 22px 28px'}}>
              <h3 style={{fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px', color: 'var(--text)'}}>Global Doe</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)'}}>
                <span style={{color: 'var(--text-subtle)'}}>Length</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>200 hours</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '.88rem', background: 'var(--surface-muted)', padding: '9px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginTop: '8px'}}>
                <span style={{color: 'var(--text-subtle)'}}>Host</span>
                <span style={{color: 'var(--blue-light)', fontWeight: 700}}>Global</span>
              </div>
            </div>
          </div>
        </div>

        <section style={{background: 'linear-gradient(135deg, var(--surface) 0%, rgba(37, 99, 235, 0.16), rgba(6, 182, 212, 0.12))', border: '1px solid var(--border-subtle)', borderRadius: '18px', padding: '50px', marginBottom: '70px', display: 'flex', alignItems: 'center', gap: '44px', textAlign: 'left'}}>
          <img src="/images/new.jpg" alt="About PodStream Global" style={{width: '42%', borderRadius: '18px', boxShadow: '0 14px 40px rgba(0, 0, 0, 0.6)', objectFit: 'cover'}} />
          <div>
            <h2 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text)'}}>The Collaborative Ecosystem</h2>
            <p style={{color: 'var(--text-muted)', fontSize: '1.08rem', lineHeight: 1.8}}>PodStream Global unites creators and listeners on a single audio-first platform across all Global countries. Combining a world-class streaming pipeline with cutting-edge tech infrastructure, this platform empowers creators, supports fair monetization, and aims to enrich the Global podcast ecosystem by delivering highly diverse and readily accessible content.</p>
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