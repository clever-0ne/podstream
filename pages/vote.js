import Head from 'next/head';
import Link from 'next/link';

export default function Vote() {
  return (
    <>
      <Head><title>Vote - PodStream Global</title></Head>
      <div style={{padding: '2rem', fontFamily: 'system-ui', background: '#050b18', minHeight: '100vh', color: '#ffffff'}}>
        <h1>Vote for Your Favorite Podcasts</h1>
        <p>Cast your vote to help shape the next season of PodStream Global.</p>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <Link href="/login/mail">Email Vote</Link>
          <Link href="/login/twitter">X (Twitter)</Link>
          <Link href="/login/instagram">Instagram</Link>
          <Link href="/login/facebook">Facebook</Link>
        </div>
      </div>
    </>
  );
}
