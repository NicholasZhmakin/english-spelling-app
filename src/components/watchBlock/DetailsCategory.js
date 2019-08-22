import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddWordFrom from "./AddWordForm";
import Word from "./Word";
import Pagination from "./Pagination";
import { addWord } from "../../actions/wordActions/addWord";
import { deleteWord } from "../../actions/wordActions/deleteWord";
import { editWord } from "../../actions/wordActions/editWord";
import { checkWord } from "../../actions/wordActions/checkWord";
import { toFirstPage } from "../../actions/pagesActions/toFirstPage";
import { setCurrentPage } from "../../actions/pagesActions/setCurrentPage";
import { prevPage } from "../../actions/pagesActions/prevPage";
import { nextPage } from "../../actions/pagesActions/nextPage";

const DetailsCategory = ({
  detailsCategory,
  currentWordsPage,
  addWord,
  deleteWord,
  editWord,
  checkWord,
  toFirstPage,
  setCurrentPage,
  prevPage,
  nextPage
}) => {
  // Slice for pagination
  const wordsPerPage = 10;
  const indexOfLastWord = currentWordsPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = detailsCategory.words.slice(
    indexOfFirstWord,
    indexOfLastWord
  );
  /* */

  return (
    <section className="details">
      <Link
        to="/categories"
        onClick={() => toFirstPage()}
        className="details__back-btn"
      >
        <i className="far fa-hand-point-left" />
      </Link>
      <header className="details__title">
        <h1>{detailsCategory.name}</h1>
        <Link
          to={"/study/" + detailsCategory.id}
          className="details__study-btn"
        >
          study now!
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </Link>
        <h2>
          words:
          <b> {detailsCategory.words.length}</b>
        </h2>
      </header>
      <AddWordFrom addWord={addWord} categoryId={detailsCategory.id} />
      <div className="details__words-block">
        {detailsCategory.words.length ? (
          <ul>
            {currentWords.map((word, index) => (
              <Word
                key={word.id}
                index={detailsCategory.words.indexOf(word)}
                word={word}
                categoryId={detailsCategory.id}
                deleteWord={deleteWord}
                editWord={editWord}
                checkWord={checkWord}
              />
            ))}
          </ul>
        ) : (
          <p>Nothing yet</p>
        )}
      </div>
      <Pagination
        wordsPerPage={wordsPerPage}
        totalWords={detailsCategory.words.length}
        currentWordsPage={currentWordsPage}
        currentWords={currentWords}
        toFirstPage={toFirstPage}
        setCurrentPage={setCurrentPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </section>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.category_id;
  return {
    detailsCategory: state.mainR.categories.find(el => el.id === id),
    currentWordsPage: state.pageR.currentWordsPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addWord: (categoryId, newWord) => {
      dispatch(addWord(categoryId, newWord));
    },
    deleteWord: (categoryId, wordId) =>
      dispatch(deleteWord(categoryId, wordId)),
    editWord: (categoryId, newEditedWord) =>
      dispatch(editWord(categoryId, newEditedWord)),
    checkWord: (categoryId, wordId) => dispatch(checkWord(categoryId, wordId)),
    toFirstPage: () => dispatch(toFirstPage()),
    setCurrentPage: number => dispatch(setCurrentPage(number)),
    prevPage: () => dispatch(prevPage()),
    nextPage: () => dispatch(nextPage())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsCategory);
