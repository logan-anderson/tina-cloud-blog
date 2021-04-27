module.exports = {
  projects: {
    app: {
      schema: ['.tina/__generated__/schema.gql'],
      documents: 'src/pages/**/*.{graphql,js,ts,jsx,tsx}',
    },
  },
};
