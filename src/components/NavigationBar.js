import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  // function to check if token is in header
  const token = localStorage.getItem("token");

  return (
    <div className="site-nav">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/exam">Exam</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
