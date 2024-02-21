import React from "react";
import { Link } from "react-router-dom";

import "./HeroButton.scss";

export default function Button({ buttonLink, buttonText }) {
  return (
    <div className="hero-cta-btn">
      <Link to={buttonLink}>{buttonText}</Link>
    </div>
  );
}
