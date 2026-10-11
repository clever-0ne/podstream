import Head from 'next/head';
import Link from 'next/link';

export default function Vote() {
  return (
    <>
      <Head><title>Vote - PodStream Global</title></Head>
      <div style={{
        padding: '2rem',
        fontFamily: 'system-ui',
        background: '#050b18',
        minHeight: '100vh',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '100%',
        overflowX: 'hidden'
      }}>
        <h1 style={{fontSize: '2rem', fontWeight: 700, marginBottom: '1rem'}}>Vote for Your Favorite Podcasts</h1>
        <p style={{color: '#9fb6d8', marginBottom: '2rem', maxWidth: '500px'}}>Cast your vote to help shape the next season of PodStream Global.</p>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center'}}>
          <Link href="/login/mail" style={{
            padding: '12px 24px',
            borderRadius: '500px',
            background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem'
          }}>Email Vote</Link>
          <Link href="/login/twitter" style={{
            padding: '12px 24px',
            borderRadius: '500px',
            background: 'transparent',
            color: '#ffffff',
            border: '1px solid #637488',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem'
          }}>X (Twitter)</Link>
          <Link href="/login/instagram" style={{
            padding: '12px 24px',
            borderRadius: '500px',
            background: 'linear-gradient(135deg, #feda75 0%, #d62976 45%, #962fbf 75%, #4f5bd5 100%)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem'
          }}>Instagram</Link>
          <Link href="/login/facebook" style={{
            padding: '12px 24px',
            borderRadius: '500px',
            background: '#1877f2',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem'
          }}>Facebook</Link>
        </div>
      </div>
    </>
  );
}