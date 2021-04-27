import React from 'react';
import {
  useGraphqlForms,
  useDocumentCreatorPlugin,
} from 'tina-graphql-gateway';
import BlogPostPage, {
  querySinglePost,
  PostQueryResponseType,
} from '../../blog/[filename]';

/**
 * This admin page works in a similar manner to the one found at "pages/admin/index.tsx"
 * The only difference is here we're using a dynamic route variable to fetch the correct file.
 */
export default function AdminPage({ filename }: { filename: string }) {
  const [payload, isLoading] = useGraphqlForms<PostQueryResponseType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-ignore
    query: querySinglePost,
    variables: { relativePath: `${filename}.md` },
  });
  useDocumentCreatorPlugin((res) => console.log(`Created new doc`, res));

  return isLoading ? <p>Loading...</p> : <BlogPostPage {...payload} />;
}

export const getServerSideProps = ({ params }: any) => ({ props: params });
