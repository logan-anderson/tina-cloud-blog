import Head from 'next/head';
import Link from 'next/link';

import { Nav } from '@/components/nav';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import { usePrefix } from '../PrefixProvider';

export const Layout: React.FC = ({ children }) => {
  const { asPath, push } = useRouter();
  const { setPrefix, prefix } = usePrefix();
  return (
    <div className="flex flex-col h-screen justify-between">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="mb-auto"> {children}</main>
      <footer className="bg-blue-white flex flex-row justify-center m-6">
        <button
          type="button"
          onClick={() => {
            if (prefix === ``) {
              setPrefix(`/admin`);
              push(`/admin${asPath}`);
            } else {
              setPrefix(``);
              push(asPath.replace(`/admin`, ``));
            }
          }}
          className="mx-5 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {prefix === `` ? `Edit page` : `Exit edit mode`}
          {/* <Link href={`/admin${asPath}`}>Edit Page</Link> */}
        </button>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            Powered by{` `}
            <img
              src="/vercel.svg"
              alt="Vercel Logo"
              className={`${styles.logo} inline`}
            />
          </span>
        </a>
      </footer>
    </div>
  );
};
