import { createClient } from '@/util';
import { useRouter } from 'next/router';
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

export default function AdminBlogPage() {
  const router = useRouter();
  const [payload, isLoading] = useGraphqlForms<PostQueryAllResponseType>({
    query: queryAllPosts,
    variables: {},
  });
  const BlogPage = getBlogPage(() => {
    useDocumentCreatorPlugin((res) =>
      router.push(`/admin/blog/${res.relativePath.replace(`.md`, ``)}`),
    );
  });
  return isLoading ? <p>Loading...</p> : <BlogPage {...payload} />;
}
