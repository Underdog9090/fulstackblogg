import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className="post-list">
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          {post.imagePath && (
            <img
              src={`http://localhost:4000/${post.imagePath}`}
              alt={post.title}
              className="post-image"
            />
          )}
          <p className="info">
            <span className="author">{post.author?.username}</span>
            <time>{format(new Date(post.createdAt), "MMM d, yyyy HH:mm")}</time>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="post-content"
          />
        </div>
      ))}
    </div>
  );
}
