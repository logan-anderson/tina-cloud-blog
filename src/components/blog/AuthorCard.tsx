import Link from 'next/link';

import { Posts_Document } from '@/../.tina/__generated__/types';
import { usePrefix } from '../PrefixProvider';

export const AuthorCard = ({ post }: { post: Posts_Document }) => {
  const { prefix } = usePrefix();
  return (
    <div className="mt-6 flex items-center">
      <div className="flex-shrink-0">
        <Link href={`${prefix}/author/${post.data?.author?.sys?.filename}`}>
          <a>
            <span className="sr-only">{post.data?.author?.data?.name}</span>
            <img
              className="h-10 w-10 rounded-full"
              src={post.data?.author?.data?.avatar || ``}
              alt=""
            />
          </a>
        </Link>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">
          <Link href={`${prefix}/author/${post.data?.author?.sys?.filename}`}>
            <a className="hover:underline">{post.data?.author?.data?.name}</a>
          </Link>
        </p>
        <div className="flex space-x-1 text-sm text-gray-500">
          {/* <time dateTime={post.datetime}>{post.data?.date}</time> */}
          <time>{post.data?.date}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.data?.minread} read</span>
        </div>
      </div>
    </div>
  );
};
