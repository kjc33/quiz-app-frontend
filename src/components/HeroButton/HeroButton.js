import React from "react";
import { Link } from "react-router-dom";

import "./HeroButton.scss";

export default function Button({ buttonLink, buttonText }) {
  return (
      <Link to={buttonLink} className="hero-cta-btn">
        <span className="hero-btn-text">{buttonText}</span>
      </Link>
  );
}
