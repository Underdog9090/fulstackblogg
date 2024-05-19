import e from "cors";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
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
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("files", files[0]);
    e.preventDefault();
    console.log(files);
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
    });

        if (response.ok) {
          console.log("Post created successfully");
          setRedirect(true);
        }   

    // console.log(response);
  }
        if (redirect) {
          return <Navigate to={"/"} />;
        }

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />{" "}
        <br />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          placeholder="Category"
        />
        <br />
        <ReactQuill
          value={content}
          modules={modules}
          formats={formats}
          onChange={(newValue) => setContent(newValue)}
          placeholder="Content"
        />{" "}
        <br />
        <button style={{ marginTop: "5px", color: "red" }} type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

// //latest version
// import e from "cors";
// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill styles
// import { Navigate } from "react-router-dom";

// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
// };
// const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "video",
// ];

// export default function CreatePost() {
//   const [content, setContent] = useState("");
//   const [title, setTitle] = useState("");
//   const [summary, setSummary] = useState("");
//   const [files, setFiles] = useState("");
//   const [redirect, setRedirect] = useState(false);

//   async function createNewPost(e) {
//     const data = new FormData();
//     data.set("title", title);
//     data.set("summary", summary);
//     data.set("content", content);
//     data.set("files", files[0]);
//     e.preventDefault();
//     console.log(files);
//     const response = await fetch("http://localhost:4000/post", {
//       method: "POST",
//       body: data,
//     });

//         if (response.ok) {
//           console.log("Post created successfully");
//           setRedirect(true);
//         }   

//     // console.log(response);
//   }
//         if (redirect) {
//           return <Navigate to={"/"} />;
//         }

//   return (
//     <div>
//       <h1>Create Post</h1>
//       <form onSubmit={createNewPost}>
//         <input
//           type="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Title"
//         />{" "}
//         <br />
//         <input
//           type="summary"
//           placeholder="Summary"
//           value={summary}
//           onChange={(e) => setSummary(e.target.value)}
//         />
//         <br />
//         <input
//           type="file"
//           onChange={(e) => setFiles(e.target.files)}
//           placeholder="Category"
//         />
//         <br />
//         <ReactQuill
//           value={content}
//           modules={modules}
//           formats={formats}
//           onChange={(newValue) => setContent(newValue)}
//           placeholder="Content"
//         />{" "}
//         <br />
//         <button style={{ marginTop: "5px", color: "red" }} type="submit">
//           Create
//         </button>
//       </form>
//     </div>
//   );
// }