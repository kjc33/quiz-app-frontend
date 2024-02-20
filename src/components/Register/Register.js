import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Register.scss";

function Register() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://quiz-app-backend-32v6.onrender.com/api/users", {
        user_name: name,
      });
      console.log("Registration successful", response.data);
      localStorage.setItem("hasProvidedName", "true");
      navigate("/exam");
    } catch (error) {
      console.error("Register error: ", error.response.data);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
