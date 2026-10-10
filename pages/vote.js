import Head from 'next/head';
import Link from 'next/link';
export default function Vote() {
  return (
    <>
      <Head><title>Vote</title></Head>
      <div style={{padding: '2rem', fontFamily: 'system-ui'}}>
        <h1>VOTE PAGE</h1>
        <Link href="/login"><a>Login</a></Link>
      </div>
    </>
  );
}
