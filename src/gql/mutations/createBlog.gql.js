export const createBlog = /* GraphQL */ `
  mutation createBlog($input: CreateBlogInput!) {
    createBlog(input: $input) {
      id
      name
    }
  }
`;
