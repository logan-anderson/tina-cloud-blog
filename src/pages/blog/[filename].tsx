/* eslint-disable no-underscore-dangle */
import Markdown from 'react-markdown';
import { Posts_Document } from '@/../.tina/__generated__/types';
import { Layout } from '@/components/layout';
import { createLocalClient } from '@/util';
import Link from 'next/link';
import { usePrefix } from '@/components/PrefixProvider';

//  Main blog page with blog body
const DetailBlogPage = ({ getPostsDocument }: PostQueryResponseType) => {
  const { prefix } = usePrefix();
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <Link href={`${prefix}/blog`}>
          <a className="text-indigo-600  hover:underline hover:font-bold">
            {` `}
            &#8592; blog index
          </a>
        </Link>
        <h1 className="text-center text-5xl my-5">
          {getPostsDocument.data?.title}
        </h1>
        <img
          className="md:max-w-xl mx-auto rounded-md shadow-sm"
          alt={getPostsDocument.data?.title || `A large blog image`}
          src={getPostsDocument.data?.imgurl || ``}
        />
        <Markdown>{getPostsDocument.data?._body || ``}</Markdown>
      </div>
    </Layout>
  );
};

export type PostQueryResponseType = {
  getPostsDocument: Posts_Document;
};

/* 
Make a graphql query for a single post
*/
export const querySinglePost = (gql: any) => gql`
  query getBlogPostQuery($relativePath: String!) {
    getPostsDocument(relativePath: $relativePath) {
      data {
        __typename
        ... on Article_Doc_Data {
          title
          date
          minread
          description
          category
          imgurl
          _body
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

const client = createLocalClient();

export const getStaticProps = async ({ params }: any) => ({
  props: await client.request(querySinglePost, {
    variables: { relativePath: `${params.filename}.md` },
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

export default DetailBlogPage;
