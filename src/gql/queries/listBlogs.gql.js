export const listBlogs = {
  name: "listBlogs",
  query: /* GraphQL */ `
    query listBlogs {
      listBlogs {
        items {
          id
          name
          posts {
            items {
              id
              title
            }
          }
        }
      }
    }
  `,
};
