import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar({ token }) {
  return (
    <div className="site-nav">
      <nav className="primary-nav">
        <ul className="nav-list">
          {token ? (
            <li className="nav-items">
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <li className="nav-items">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
