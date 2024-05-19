import React, { useState, useEffect, useContext } from "react"; // Import useContext
import { Navigate } from "react-router-dom";
import { UserContext } from "../user"; // Import UserContext

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setuserInfo } = useContext(UserContext);

  useEffect(() => {
    const handleRedirect = async () => {
      if (redirect) {
        // Navigate to home page upon successful login
        try {
          const response = await fetch("http://127.0.0.1:4000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });
          if (!response.ok) {
            throw new Error("Login failed");
          }
          const data = await response.json().then((userInfo) => {
            setuserInfo(userInfo);
            setRedirect(true);
          });
          console.log(data);
        } catch (error) {
          console.error("Login error:", error.message);
          setError("Login failed. Please try again.");
        }
      }
    };
    handleRedirect();
  }, [redirect, username, password]); // Depend on 'redirect', 'username', and 'password'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setError("Please fill all the fields");
    }
    setError("");
    setRedirect(true); // Set redirect to true upon form submission
  };

  return (
    <>
      {redirect && <Navigate to="/" />}{" "}
      {/* Render Navigate component based on redirect state */}
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

