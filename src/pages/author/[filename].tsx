/* eslint-disable no-underscore-dangle */
import Markdown from 'react-markdown';
import { Authors_Document } from '@/../.tina/__generated__/types';
import { Layout } from '@/components/layout';
import { createLocalClient } from '@/util';
import Link from 'next/link';
import { usePrefix } from '@/components/PrefixProvider';

const DetailBlogPage = ({ getAuthorsDocument }: QuerySingleAuthor) => {
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
          {getAuthorsDocument.data?.name}
        </h1>
        <img
          className="md:max-w-xl mx-auto rounded-md shadow-sm"
          src={getAuthorsDocument.data?.avatar || ``}
          alt={`The author ${getAuthorsDocument.data?.name}`}
        />
        <p>{getAuthorsDocument.data?._body}</p>
      </div>
    </Layout>
  );
};

/* 
Make a graphql query for a single post
*/
export type QuerySingleAuthor = {
  getAuthorsDocument: Authors_Document;
};
export const querySingleAuthor = (gql: any) => gql`
  query getBlogPostQuery($relativePath: String!) {
    getAuthorsDocument(relativePath: $relativePath) {
      sys {
        filename
      }
      data {
        __typename
        ... on Author_Doc_Data {
          name
          avatar
          _body
        }
      }
    }
  }
`;

const client = createLocalClient();

export const getStaticProps = async ({ params }: any) => {
  console.log({ params });
  return {
    props: await client.request(querySingleAuthor, {
      variables: { relativePath: `${params.filename}.md` },
    }),
  };
};
export const getStaticPaths = async () => {
  const getAuthorList = await client.request<{
    getAuthorsList: Authors_Document[];
  }>(
    (gql) => gql`
      {
        getAuthorsList {
          sys {
            filename
          }
        }
      }
    `,
    { variables: {} },
  );
  return {
    paths: getAuthorList.getAuthorsList.map((author) => ({
      params: { filename: author?.sys?.filename },
    })),
    fallback: false,
  };
};

export default DetailBlogPage;
