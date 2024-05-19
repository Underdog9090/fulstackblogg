const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    imagePath: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assuming author is a reference to the User model
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
