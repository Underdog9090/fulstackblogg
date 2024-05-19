require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the 'uploads' directory

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ username: username, userId: user._id }, secretKey);
    res.json({
      message: "Login successful",
      token,
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

app.get("/profile", async (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded.userId);

    res.json({ username: user.username, id: user._id, iat: decoded.iat });
  });
});

app.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

app.post("/post", upload.single("files"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = `${path}.${ext}`;

    fs.renameSync(path, newPath);

    const { title, summary, content, author } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      imagePath: newPath,
      author,
    });

    res.json(postDoc);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/post", async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.json(posts);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
