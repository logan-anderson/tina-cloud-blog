import { Layout } from '@/components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
    </Layout>
  );
}
