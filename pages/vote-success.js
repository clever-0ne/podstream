import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function VoteSuccessPage() {
  const [showOverlay, setShowOverlay] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
      // Redirect to home or admin after showing
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vote Received - PodStream Global</title>
      </Head>

      <style jsx>{`
        html, body { height: 100%; margin: 0; padding: 0; }
        body { 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
          background: var(--bg, #050b18); 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 100vh;
          color: #eaf2ff;
        }
        .success-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(0,0,0,0.97); 
          display: ${showOverlay ? 'flex' : 'none'};
          align-items: center; 
          justify-content: center; 
          z-index: 9999;
        }
        .success-box { 
          text-align: center; 
          padding: 20px;
        }
        .checkmark { 
          width: 110px; 
          height: 110px; 
          background: #4caf50; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          margin: 0 auto 28px;
          box-shadow: 0 4px 12px rgba(76,175,80,0.4);
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
          font-family: 'Segoe UI', sans-serif; 
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
        .back-link {
          color: #666;
          text-decoration: none;
          font-size: 14px;
          margin-top: 20px;
          display: inline-block;
        }
        .back-link:hover { text-decoration: underline; }
      `}</style>

      <div className="success-overlay" id="successOverlay">
        <div className="success-box">
          <div className="checkmark">
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <polyline points="15,27 24,36 39,17"></polyline>
            </svg>
          </div>
          <h2>Your vote has been received</h2>
          <p>We will get back to you when your vote is counted.</p>
          <a href="/" className="back-link">← Back to homepage</a>
        </div>
      </div>
    </>
  );
}