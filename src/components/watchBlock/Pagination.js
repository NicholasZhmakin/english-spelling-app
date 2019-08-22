import React from "react";
import PropTypes from "prop-types";

const Pagination = ({
  wordsPerPage,
  totalWords,
  currentWordsPage,
  currentWords,
  setCurrentPage,
  prevPage,
  nextPage,
  toFirstPage
}) => {
  if (currentWords.length === 0 && totalWords.length !== 0) {
    toFirstPage();
  }
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalWords / wordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className={
        totalWords <= wordsPerPage
          ? "pagination pagination__none"
          : "pagination"
      }
    >
      <ul className="pagination__list">
        <li>
          <button
            className="pagination__prev"
            disabled={currentWordsPage === 1}
            onClick={() => prevPage()}
          >
            <i className="fas fa-angle-double-left" />
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              className={
                currentWordsPage === number
                  ? "pagination__number pagination__active"
                  : "pagination__number"
              }
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className="pagination__next"
            disabled={currentWordsPage === pageNumbers.length}
            onClick={() => nextPage()}
          >
            Next
            <i className="fas fa-angle-double-right" />
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  wordsPerPage: PropTypes.number,
  totalWords: PropTypes.number,
  currentWordsPage: PropTypes.number,
  currentWords: PropTypes.array,
  setCurrentPage: PropTypes.func,
  prevPage: PropTypes.func,
  nextPage: PropTypes.func,
  toFirstPage: PropTypes.func
};

export default Pagination;
