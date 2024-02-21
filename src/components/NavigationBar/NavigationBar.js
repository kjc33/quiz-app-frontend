import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar({ token }) {
  return (
    <div className="site-nav">
      <nav>
        <ul>
          {token ? (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
