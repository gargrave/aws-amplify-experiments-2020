import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { Blog } from "./components";
import { performMutation, performQuery } from "./gql/api";
import { createBlog, deleteBlog } from "./gql/mutations";
import { listBlogs } from "./gql/queries";

import "./App.css";

const isSameBlog = (blogA) => (blogB) => blogA.id === blogB.id;

const sortByName = ({ name: nameA }, { name: nameB }) =>
  nameA === nameB ? 0 : nameA > nameB ? 1 : -1;

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
      const newBlog = await performMutation(createBlog, { name });
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    }
  };

  const handleDeleteBlog = async (payload) => {
    const { id } = payload;
    if (id) {
      const deletedBlog = await performMutation(deleteBlog, { id });
      const isDeletedBlog = isSameBlog(deletedBlog);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => !isDeletedBlog(blog)));
    }
  };

  React.useEffect(() => {
    const asyncFetchAll = async () => {
      const blogs = await performQuery(listBlogs);
      blogs.sort(sortByName);
      setBlogs(blogs);
    };
    asyncFetchAll();
  }, []);

  return (
    <div className="App">
      <main className="mainContent">
        {blogs.length ? (
          blogs.map((blog) => (
            <Blog blog={blog} key={blog.id} onDelete={handleDeleteBlog} />
          ))
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
