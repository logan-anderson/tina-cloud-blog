import React from 'react';
import { useGraphqlForms } from 'tina-graphql-gateway';
import HomePage from '..';

/**
 * HEADS UP: notice how we're importing `HomePage` from another Next.js route file?
 *
 * This page will be identical to the other route file except it'll come with a
 * Tina sidebar form built for you automatically!
 */
export default function AdminPage() {
  //   const [payload, isLoading] = useGraphqlForms({
  //     query,
  //     variables: {},
  //   });

  return <HomePage />;
}
