export const deleteBlog = {
  name: "deleteBlog",
  mutation: /* GraphQL */ `
    mutation deleteBlog($input: DeleteBlogInput!) {
      deleteBlog(input: $input) {
        id
        name
        posts {
          items {
            id
          }
        }
      }
    }
  `,
};
