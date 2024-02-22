import React from "react";

import "./MobileNavList.scss";

export default function MobileNavList({ navClass, navId, ulClass, liClass, navItems, active, onLinkClick }) {
  const mobileClass = active ? "active" : "inactive";

  const handleLinkClick = () => {
    if (onLinkClick && typeof onLinkClick === "function") {
      onLinkClick();
    }
  };

  return (
    <nav className={`${navClass} ${mobileClass}`} id={navId}>
      <ul className={ulClass}>
        {navItems.map((item, index) => (
          <li key={index} className={liClass}>
            <a href={item.href} onClick={handleLinkClick}>
              {item.navLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}