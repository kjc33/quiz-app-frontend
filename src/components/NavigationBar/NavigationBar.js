import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../../media/quizer-logo-light.svg";
import MobileNav from "../MobileNav/MobileNav";
import "./NavigationBar.scss";

export default function NavigationBar({ token }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "header-scrolled" : "header-static"}>
      <div className="container flex align-items-center space-between medium-gap max-width">
        <figure className="site-logo">
          <Link to="/">
            <img src={Logo} alt="Quizer Logo" width="100px" height="auto" />
          </Link>
        </figure>
        <nav className="primary-nav flex align-items-center">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/exam">Exam</Link>
            </li>
            <li className="nav-item">
              <a href="/#top-scores">Top Scores</a>
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
        <MobileNav />
      </div>
    </header>
  );
}
