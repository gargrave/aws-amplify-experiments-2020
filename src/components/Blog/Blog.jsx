import * as React from "react";

import "./Blog.css";

export const Blog = React.memo(({ blog, onDelete }) => {
  const { id, name } = blog;

  return (
    <div className="blogWrapper">
      <div className="blog">
        {name} <span className="blog__id">({id})</span>
      </div>
      <button onClick={() => onDelete({ id })}>Delete</button>
    </div>
  );
});
