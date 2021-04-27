import Head from 'next/head';
import { Nav } from '@/components/nav';
import styles from '@/styles/Home.module.css';

export const Layout: React.FC = ({ children }) => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />
    <main>{children}</main>
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=typescript-nextjs-starter"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{` `}
        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </a>
    </footer>
  </div>
);
