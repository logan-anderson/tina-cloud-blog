/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

const PrefixContext = React.createContext({
  prefix: ``,
  setPrefix: (prefix: string) => {},
});

/* 
We will wrap our app in this so we will always be able to get the prefix state with `usePrefix`
*/
export const PrefixProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [prefix, setPrefix] = useState(
    // use the correct prefix as initial state
    router.route.startsWith(`/admin`) ? `/admin` : ``,
  );
  return (
    <PrefixContext.Provider value={{ prefix, setPrefix }}>
      {children}
    </PrefixContext.Provider>
  );
};

export const usePrefix = () => useContext(PrefixContext);
