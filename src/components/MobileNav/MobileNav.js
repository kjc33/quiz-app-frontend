import React, { useState } from "react";
import MobileNavList from "./MobileNavList";

import "./MobileNav.scss";

export default function MobileNav() {
  const navItems = [
    { href: "/exam", navLabel: "Exam" },
    { href: "/#top-scores", navLabel: "Top Scores" },
    { href: "/login", navLabel: "Login" },
  ];

  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileMenu = () => {
    setMobileNavVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-burger" id="mobileMenuBurger" onClick={toggleMobileMenu}>
        <div className="top-bar"></div>
        <div className="middle-bar"></div>
        <div className="bottom-bar"></div>
      </div>
      {mobileNavVisible && (
        <div className={`mobile-menu-nav-wrapper ${mobileNavVisible ? "active" : "inactive"}`} id="mobileMenuNav">
          <MobileNavList navClass="mobile-menu-nav-items" navId="mobileMenuNavItems" ulClass="mobile-menu-nav-list-items" liClass="nav-item" navItems={navItems} active={mobileNavVisible} onLinkClick={toggleMobileMenu} />
          <div className={`mobile-close-btn ${mobileNavVisible ? "visible" : ""}`}>
            <div aria-label="Mobile Menu Close Button" className="close-btn" id="closeBtn" onClick={toggleMobileMenu}></div>
          </div>
        </div>
      )}
    </div>
  );
}
