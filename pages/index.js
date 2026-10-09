import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="PodStream Global — The Voting Platform" ogImage="/og-image.jpg">
      <style jsx>{`
        html, body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          background: #050b18;
          color: #eaf2ff;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          text-align: center;
          padding: 40px;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .btn {
          display: inline-block;
          padding: 15px 30px;
          background: #2563eb;
          color: white;
          text-decoration: none;
          border-radius: 500px;
          font-weight: 700;
          transition: all 0.3s;
        }
        .btn:hover {
          background: #1e40af;
          transform: translateY(-3px);
        }
      `}</style>
      <div className="container">
        <h1>PodStream Global</h1>
        <p>The Ultimate Streamer Contest Voting Platform</p>
        <Link href="/vote" className="btn">Enter Voting Platform</Link>
      </div>
    </Layout>
  );
}