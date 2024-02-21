import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://quiz-app-backend-32v6.onrender.com/admin/login", {
        email,
        password,
      });

      console.log("Login successful", response.data);

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token); // Update the token state in the parent component

      setErrorMessage("");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error: ", error.response.data);
      setErrorMessage("Username or password are incorrect. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
