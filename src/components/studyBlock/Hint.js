import React from "react";
import PropTypes from "prop-types";

const Hint = ({ showHint, origin, isHintOn }) => {
  const openLetter = e => {
    e.target.classList.add("hint__showLetter");
  };

  return (
    <section className="hint">
      <button onClick={showHint} className="hint__btn">
        <i className="far fa-lightbulb" />
      </button>

      <div
        className={
          isHintOn ? "hint__letters-block" : "hint__letters-block hidden"
        }
      >
        {origin.split("").map((element, index) => {
          return (
            <div key={index} className="hint__letter">
              <p onClick={openLetter} className="hint__letter-front">
                {index + 1}
              </p>
              <p className="hint__letter-back">{element}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

Hint.propTypes = {
  isHintOn: PropTypes.bool,
  origin: PropTypes.string,
  showHint: PropTypes.func
};

export default Hint;
