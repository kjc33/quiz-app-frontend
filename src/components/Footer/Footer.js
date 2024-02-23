import React from "react";

import FooterLogo from "../../media/quizer-footer-logo.svg";
import "./Footer.scss";

export default function Footer() {
  const copyrightDate = new Date().getFullYear();

  return (
    <footer>
      <div className="container flex flex-column medium-gap max-width">
        <div className="footer-logo">
            <figure>
                <img src={FooterLogo} alt="Quizer Footer Logo" width="70" />
            </figure>
        </div>
        <div className="disclaimer">
            <p>Please note: Quizer, LLC is a fictitious company and is not intended to represent an actual business. Any similarities to company names, colors, or other protected copyrights is purely coincidental. This website is for fun and exists for learning purposes. You can view the frontend code <a href="https://github.com/kjc33/quiz-app-frontend" target="_blank" rel="noreferrer">here</a> and the backend code <a href="https://github.com/kjc33/quiz-app-backend" target="_blank" rel="noreferrer">here</a>.</p>
            <div className="footer-divider"></div>
        </div>
        <div className="footer-signature">
          <p>
            &copy; {copyrightDate} Quizer, LLC. All rights reserved. <span className="pipe">|</span> <a href="https://www.kylejohnchin.com" target="_blank" rel="noreferrer">Website by Kyle Chin</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
