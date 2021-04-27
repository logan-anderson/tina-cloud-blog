import { Blog } from '@/components/blog';
import { Layout } from '@/components/layout';
import { createLocalClient } from '@/util';
import { Posts_Document } from '../../../.tina/__generated__/types';

const BlogPage = ({ getPostsList }: PostQueryAllResponseType) => {
  console.log({ test: getPostsList });
  return (
    <Layout>
      <Blog posts={getPostsList} />
    </Layout>
  );
};

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

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const postsListData = await client.request<{
    getPostsList: Posts_Document[];
  }>(
    (gql) => gql`
      {
        getPostsList {
          sys {
            filename
          }
        }
      }
    `,
    { variables: {} },
  );
  return {
    paths: postsListData.getPostsList.map((post: Posts_Document) => ({
      params: { filename: post?.sys?.filename },
    })),
    fallback: false,
  };
};

export default BlogPage;
