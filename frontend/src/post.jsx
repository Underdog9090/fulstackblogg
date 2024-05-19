import React from "react";
import { format, isValid, toDate } from "date-fns";

export default function Post({
  title,
  summary,
  content,
  createdAt,
  imagePath,
}) {
  console.log("createdAt:", createdAt); // Log the createdAt prop

  const dateObject = toDate(createdAt);

  // Check if the dateObject is valid
  if (!isValid(dateObject)) {
    console.error("Invalid createdAt value:", createdAt);
    return <div>Error: Invalid date</div>;
  }

  return (
    <div>
      <div className="content">
        {/* <img src={imagePath} alt="hero" /> */}
        <img
          src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="hero"
        />
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Erik </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p>{summary}</p>
      </div>{" "}
      {/* //Next post */}
      <div className="content">
        {/* <img src={imagePath} alt="hero" /> */}
        <img src="https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Jones </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p>{summary}</p>
      </div>{" "}
      <div className="content">
        {/* <img src={imagePath} alt="hero" /> */}
        <img src="https://images.unsplash.com/photo-1532983330958-4b32bbe9bb0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        <h2>{title}</h2>
        <p className="info">
          <a className="author">Gemma </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
}
