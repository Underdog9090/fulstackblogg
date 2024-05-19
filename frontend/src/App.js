import "./App.css";
import Post from "./post";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Wrapper from "./Wrapper";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./user";
import CreatePost from "./pages/CreatePost";
function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Wrapper />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
