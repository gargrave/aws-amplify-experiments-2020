import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";

import { Blog } from "./components";
import { parsePayload } from "./gql/helpers/parsePayload";
import { createBlog } from "./gql/mutations";
import { listBlogs } from "./gql/queries";

import "./App.css";

function App() {
  const [blogs, setBlogs] = React.useState([]);
  const [formData, setFormData] = React.useState({ title: "" });

  const handleInputChange = React.useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleCreateBlog = async (event, payload) => {
    event.preventDefault();
    const { name } = payload;

    if (name) {
      const result = await API.graphql(
        graphqlOperation(createBlog, { input: { name } })
      );
      const newBlog = parsePayload("createBlog")(result);
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    }
  };

  React.useEffect(() => {
    const asyncFetchAll = async () => {
      const blogs = await API.graphql(graphqlOperation(listBlogs));
      const blogsData = parsePayload("listBlogs")(blogs);
      setBlogs(blogsData);
    };
    asyncFetchAll();
  }, []);

  return (
    <div className="App">
      <main className="mainContent">
        {blogs.length ? (
          blogs.map((blog) => <Blog blog={blog} key={blog.id} />)
        ) : (
          <div>Loading Blogs...</div>
        )}

        <hr />
        <form
          onSubmit={(event) => handleCreateBlog(event, formData)}
          noValidate
        >
          <label htmlFor="name">Blog name</label>
          <input onChange={handleInputChange} name="name" />
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}

export default withAuthenticator(App);
