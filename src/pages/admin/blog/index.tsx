import { useDocumentCreatorPlugin } from 'tina-graphql-gateway';
import * as BlogPostPage from '../../blog';

/**
 * This admin page works in a similar manner to the one found at "pages/admin/index.tsx"
 * The only difference is here we're using a dynamic route variable to fetch the correct file.
 */
export default BlogPostPage.getBlogPage(() => {
  useDocumentCreatorPlugin((res) => console.log(`Created new doc`, res));
});
// export const getStaticPaths = BlogPostPage.getStaticPaths;

export const getServerSideProps = BlogPostPage.getStaticProps;
