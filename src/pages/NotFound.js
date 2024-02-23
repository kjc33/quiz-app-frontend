import React from "react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container flex flex-column medium-gap small-width">
        <h1 className="main-body-heading">404 Error</h1>
        <p>Sorry! The page you requested cannot be found. If you typed in the URL, please make sure the spelling is correct. If you clicked a link to get here, there may be a problem with the link.</p>
      </div>
    </section>
  );
}
