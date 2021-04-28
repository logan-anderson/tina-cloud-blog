import { Blog } from '@/components/blog';
import { Layout } from '@/components/layout';
import { createLocalClient } from '@/util';
import { Posts_Document } from '../../../.tina/__generated__/types';

/* 
This function generates the blog page (Like a factory method).
It can also be passed a hook function that will be called before returns the page.
*/
export const getBlogPage = (hookfunc?: () => void) => {
  const BlogPage = ({ getPostsList }: PostQueryAllResponseType) => {
    if (hookfunc) {
      hookfunc();
    }
    return (
      <Layout>
        <Blog posts={getPostsList} />
      </Layout>
    );
  };
  return BlogPage;
};
const BlogPage = getBlogPage();

// Query for getting all of the blog posts
export const queryAllPosts = (gql: any) => gql`
  query BlogPostQuery {
    getPostsList {
      sys {
        filename
      }
      data {
        __typename
        ... on Article_Doc_Data {
          title
          date
          minread
          description
          imgurl
          author {
            data {
              ... on Author_Doc_Data {
                name
                avatar
              }
            }
          }
        }
      }
    }
  }
`;

export type PostQueryResponseType = {
  getPostsDocument: Posts_Document;
};
export type PostQueryAllResponseType = {
  getPostsList: Posts_Document[];
};

const client = createLocalClient();

export const getStaticProps = async () => ({
  props: await client.request(queryAllPosts, {
    variables: {},
  }),
});

export default BlogPage;
