import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const registerUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Username is already taken");
        } else {
          throw new Error("Registration failed");
        }
      }

      const data = await response.json();
      console.log(data);
      setSuccessMessage("Registration successful. You can now log in.");
    } catch (error) {
      console.error("Registration error:", error.message);
      setError("Registration failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      return setError("Please fill all the fields");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    setError("");
    setSuccessMessage("");
    await registerUser();
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h1>Register</h1>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
