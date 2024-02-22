import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../media/quizer-logo-light.svg";
import "./NavigationBar.scss";

export default function NavigationBar({ token }) {
  return (
    <header>
      <div className="container flex align-items-center space-between medium-gap max-width">
        <figure>
          <Link to="/">
            <img src={Logo} alt="Quizer Logo" width="120px" height="auto" />
          </Link>
        </figure>
        <nav className="primary-nav flex align-items-center">
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
      </div>
    </header>
  );
}
