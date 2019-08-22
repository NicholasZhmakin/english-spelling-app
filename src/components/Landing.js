import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <header className="landing__title">
        <h1>
          improve your <em>english</em>
          <br />
          right now!
        </h1>
        <Link className="landing__start-btn" to="/categories">
          start
        </Link>
      </header>
    </section>
  );
};

export default Landing;
