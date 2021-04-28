import { createClient } from '@/util';
import { useEffect, useState } from 'react';
import {
  useDocumentCreatorPlugin,
  useGraphqlForms,
} from 'tina-graphql-gateway';
// import * as BlogPostPage from '../../blog';
import {
  queryAllPosts,
  getBlogPage,
  PostQueryAllResponseType,
} from '../../blog';

const client = createClient();
/**
 * This admin page works in a similar manner to the one found at "pages/admin/index.tsx"
 * The only difference is here we're using a dynamic route variable to fetch the correct file.
 */
// export default BlogPostPage.getBlogPage(() => {
//   useDocumentCreatorPlugin((res) => console.log(`Created new doc`, res));
// });
// export const getStaticPaths = BlogPostPage.getStaticPaths;

// export const getServerSideProps = BlogPostPage.getStaticProps;

export default function AdminBlogPage() {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState<PostQueryAllResponseType>(
  //   {} as PostQueryAllResponseType,
  // );
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const data = await client.request<PostQueryAllResponseType>(
  //       queryAllPosts,
  //       { variables: {} },
  //     );
  //     console.log({ data });
  //     if (data) {
  //       setData(data);
  //     }
  //   };
  //   fetchData().then(() => setLoading(false));
  // }, [setLoading]);
  // const [payload, isLoading] = useGraphqlForms<PostQueryAllResponseType>({
  //   query: queryAllPosts,
  //   variables: {},
  // });

  const [payload, isLoading] = useGraphqlForms<PostQueryAllResponseType>({
    query: queryAllPosts,
    formify: ({ formConfig, createForm, skip }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return skip();
      console.log(formConfig.id);
      if (formConfig.id === `getPostsDocument`) {
        console.log({ skip });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return skip();
      }

      return createForm(formConfig);
    },
    variables: {},
  });
  const BlogPage = getBlogPage(() => {
    useDocumentCreatorPlugin((res) => console.log(`Created new doc`, res));
  });
  // console.log({ data });
  return isLoading ? <p>Loading...</p> : <BlogPage {...payload} />;
}
