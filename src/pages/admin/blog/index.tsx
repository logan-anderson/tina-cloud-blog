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
  const [payload, isLoading] = useGraphqlForms<PostQueryAllResponseType>({
    query: queryAllPosts,
    variables: {},
  });
  const BlogPage = getBlogPage(() => {
    useDocumentCreatorPlugin((res) => console.log(`Created new doc`, res));
  });
  console.log({ payload });
  return isLoading ? <p>Loading...</p> : <BlogPage {...payload} />;
}
