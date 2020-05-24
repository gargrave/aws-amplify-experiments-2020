export const createBlog = {
  name: "createBlog",
  mutation: /* GraphQL */ `
    mutation createBlog($input: CreateBlogInput!) {
      createBlog(input: $input) {
        id
        name
      }
    }
  `,
};
