import { Layout } from '@/components/layout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js</a> +{` `}
        <a href="https://tina.io">Tina Cloud</a> example
      </h1>
    </Layout>
  );
}
