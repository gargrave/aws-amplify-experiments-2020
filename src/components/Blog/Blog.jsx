import * as React from "react";

import "./Blog.css";

export const Blog = React.memo(({ blog, onDelete }) => {
  const { id, name, posts } = blog;

  return (
    <div className="blogWrapper">
      <div className="blog__title">
        {name} <span className="blog__id">({id})</span>
      </div>

      <div className="blog__posts">{posts.items.length} Posts</div>

      <button onClick={() => onDelete({ id })}>Delete</button>
    </div>
  );
});
