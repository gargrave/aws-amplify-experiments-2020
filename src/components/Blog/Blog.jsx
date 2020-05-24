import * as React from "react";

import "./Blog.css";

export const Blog = React.memo(({ blog }) => {
  const { id, name } = blog;

  return (
    <div className="blog">
      {name} <span className="blog__id">({id})</span>
    </div>
  );
});
