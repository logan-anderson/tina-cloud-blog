import { defineSchema } from 'tina-graphql-gateway-cli';

export default defineSchema({
  collections: [
    {
      label: 'Blog Posts',
      name: 'posts',
      path: 'content/posts',
      templates: [
        {
          label: 'Article',
          name: 'article',
          fields: [
            {
              type: 'text',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'text',
              label: 'Date',
              name: 'date',
            },
            {
              type: 'number',
              label: 'Minute read',
              name: 'minread',
              description: 'How many minutes it will take to read the article',
            },
            {
              type: 'textarea',
              label: 'Description',
              name: 'description',
            },
            {
              type: 'text',
              label: 'Category',
              name: 'category',
            },
            {
              type: 'text',
              label: 'Blog Image',
              name: 'imgurl',
            },
            {
              type: 'reference',
              label: 'Author',
              name: 'author',
              collection: 'authors',
            },
          ],
        },
      ],
    },
    {
      label: 'Authors',
      name: 'authors',
      path: 'content/authors',
      templates: [
        {
          label: 'Author',
          name: 'author',
          fields: [
            {
              type: 'text',
              label: 'Name',
              name: 'name',
            },
            {
              type: 'text',
              label: 'Avatar',
              name: 'avatar',
            },
          ],
        },
      ],
    },
  ],
});
