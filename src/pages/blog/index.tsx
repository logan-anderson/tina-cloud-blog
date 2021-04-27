// const blogs = [
//   { excerpt: `bla`, title: `Hello world`, id: 1 },
//   { excerpt: `bla`, title: `Hello world`, id: 2 },
//   { excerpt: `bla`, title: `Hello world`, id: 3 },
//   { excerpt: `bla`, title: `Hello world`, id: 4 },
// ];

import { Blog } from '@/components/blog';
import { Layout } from '@/components/layout';

const BlogPage = () => (
  <Layout>
    <Blog />
  </Layout>
);

export default BlogPage;
