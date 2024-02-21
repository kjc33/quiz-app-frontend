import React from "react";
import { Link } from "react-router-dom";

import "./NavigationBar.scss";

export default function NavigationBar({ token }) {
  return (
    <header>
      <nav className="primary-nav flex align-items-center max-width">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/exam">Exam</Link>
          </li>
          <li className="nav-item">
            <Link to="/#top-scores">Top Scores</Link>
          </li>
          {token ? (
            <li className="nav-item">
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
