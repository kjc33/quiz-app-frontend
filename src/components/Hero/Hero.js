import React from "react";
import HeroButton from "../HeroButton/HeroButton";

import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container flex flex-row space-between align-items-flex-end medium-gap max-width">
        <h1 className="primary-heading">Are you up to the test?</h1>
        <HeroButton buttonLink="/exam" buttonText="Try Now"></HeroButton>
      </div>
    </section>
  );
}
