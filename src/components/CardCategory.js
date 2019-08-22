import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardCategory = ({ category, openEditModal, openConfirmModal }) => {
  const limitCardCategoryTitle = (title, limit = 40) => {
    const newTitle = [];
    if (title.length > limit) {
      title.split(" ").reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newTitle.join(" ")}...`;
    }
    return title;
  };

  const amountOfLearnedWords = category.words.filter(
    word => word.isLearnt === true
  ).length;

  const progressValue = (amountOfLearnedWords / category.words.length) * 100;

  return (
    <div className="card-category">
      <div className="card-category__front">
        <h2>{limitCardCategoryTitle(category.name)}</h2>
        <p>
          {category.words.length}
          {category.words.length === 1 ? (
            <span> word</span>
          ) : (
            <span> words</span>
          )}
        </p>
        <progress max="100" value={progressValue.toString()} />
        <i className="fas fa-book" />
      </div>

      <div className="card-category__back">
        <Link
          to={"/categories/" + category.id}
          className="card-category__btn-watch"
        >
          watch
          <i className="fas fa-eye" />
        </Link>

        <Link to={"/study/" + category.id} className="card-category__btn-study">
          study
          <i className="fas fa-graduation-cap" />
        </Link>

        <button
          onClick={() => {
            openEditModal(category);
          }}
          className="card-category__btn-edit"
        >
          edit
          <i className="fas fa-pencil-alt" />
        </button>

        <button
          onClick={() => {
            openConfirmModal(category);
          }}
          className="card-category__btn-delete"
        >
          delete
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  );
};

CardCategory.propTypes = {
  category: PropTypes.object,
  openEditModal: PropTypes.func,
  openConfirmModal: PropTypes.func
};

export default CardCategory;
