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
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secretKey = process.env.SECRET_KEY;

// mongoose.connect(
//   "mongodb+srv://erikhakizimana03:WWe2ZdMIjwFRiKEz@cluster0.zdxun5x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

// const secretKey =
//   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

// Middleware to protect routes that require authentication
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

// Route to register a new user
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

// Route to log in an existing user and generate JWT token
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

// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route" });
});

// Welcome route
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
  // res.cookie("token", "").json({ message: "Logout successful" });
  res.json({ message: "Logout successful" });
});

app.post("/post", upload.single("files"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  fs.renameSync(req.file.path, req.file.path + "." + ext);
  const newPath = req.file.path + "." + ext;

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    imagePath: newPath,
  });

  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
