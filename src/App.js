import React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { API, graphqlOperation } from "aws-amplify";

import { listBlogs } from "./gql/queries";

import "./App.css";
import { parsePayload } from "./gql/helpers/parsePayload";

function App() {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const asyncFetchAll = async () => {
      const blogs = await API.graphql(graphqlOperation(listBlogs));
      const blogsData = parsePayload("listBlogs")(blogs);
      console.log({ blogs, blogsData });
    };
    asyncFetchAll();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
