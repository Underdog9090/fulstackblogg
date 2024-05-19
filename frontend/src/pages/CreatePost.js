import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files && files.length > 0) {
      data.append("files", files[0]);
    }

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      console.error("Failed to create post");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
        />
        <br />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <br />
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={setContent}
          placeholder="Content"
        />
        <br />
        <button type="submit" style={{ marginTop: "5px", color: "red" }}>
          Create
        </button>
      </form>
    </div>
  );
}
