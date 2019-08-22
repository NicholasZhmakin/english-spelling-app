import React from "react";

const Default = props => {
  return (
    <section className="default">
      <header className="default__title">
        <h1>404</h1>
        <h2>error</h2>
        <h3>page not found</h3>
        <h4>
          the requester URL
          <span>{props.location.pathname} </span>
          was not found
        </h4>
      </header>
    </section>
  );
};

export default Default;
