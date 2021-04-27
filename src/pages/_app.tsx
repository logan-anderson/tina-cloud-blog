import '@/styles/global.css';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { PrefixProvider } from '@/components/PrefixProvider';

const TinaWrapper = dynamic(() => import(`../components/tina-wrapper`));

function MyApp({ Component, pageProps }: any) {
  const { route } = useRouter();

  // make sure the correct prefix is being used on first page load

  /**
   * If the route starts with /admin, we'll wrap the entire component tree
   * with Tina, meaning your non-admin routes won't contain any Tina code
   * in their bundles.
   */
  if (route.startsWith(`/admin`)) {
    return (
      <PrefixProvider>
        <TinaWrapper>
          <Component {...pageProps} />
        </TinaWrapper>
      </PrefixProvider>
    );
  }
  return (
    <>
      <PrefixProvider>
        <Component {...pageProps} />
      </PrefixProvider>
    </>
  );
}

export default MyApp;
