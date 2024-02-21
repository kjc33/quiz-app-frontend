import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem("token");

    // Update the token state in the parent component
    setToken(null);

    // Redirect to the home page
    navigate("/");
  }, [navigate, setToken]);

  return <div>Logging out...</div>;
}
