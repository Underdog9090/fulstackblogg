import React, { useEffect, useState } from "react";
import Header from "../Header";
import Post from "../post";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <Header />
      {posts.length > 0
        ? posts.map((post) => (
            <Post
              key={post._id}
              title={post.title}
              summary={post.summary}
              content={post.content}
              imagePath={post.imagePath}
              createdAt={new Date(post.createdAt)} // Convert createdAt to Date object
            />
          ))
        : null}
    </>
  );
}
