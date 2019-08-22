import React, { Component } from "react";
import PropTypes from "prop-types";

class Word extends Component {
  state = {
    editWordMode: false,
    id: this.props.word.id,
    origin: this.props.word.origin,
    translation: this.props.word.translation,
    isLearnt: this.props.word.isLearnt
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCheck = () => {
    this.setState(
      {
        isLearnt: !this.state.isLearnt
      },
      () => {
        this.props.checkWord(this.props.categoryId, this.props.word.id);
      }
    );
  };

  handleClick = e => {
    e.preventDefault();
    if (!this.state.origin || !this.state.translation) {
      alert("The fields cant be empty");
      return false;
    } else {
      this.props.editWord(this.props.categoryId, this.state);
      this.setState({
        editWordMode: false
      });
    }
  };

  render() {
    const { index, word, deleteWord, categoryId } = this.props;
    const { editWordMode, origin, translation, isLearnt } = this.state;
    let wordBlock;

    if (editWordMode) {
      wordBlock = (
        <form onSubmit={this.handleClick} className="edit-word__form">
          <input
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            name="origin"
            value={origin}
          />

          <input
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            name="translation"
            value={translation}
          />
          <div>
            <button
              onClick={this.handleClick}
              className="edit-word__btn"
              type="submit"
            >
              <i className="far fa-save" />
            </button>
          </div>
        </form>
      );
    } else {
      wordBlock = (
        <div className="details__word">
          <h3>
            <span>{index + 1}. </span>
            {word.origin}
          </h3>
          <p>{word.translation}</p>
          <div className="details__word-btns">
            <button onClick={() => this.setState({ editWordMode: true })}>
              <i className="fas fa-edit" />
            </button>
            <button
              onClick={() => {
                deleteWord(categoryId, word.id);
              }}
            >
              <i className="fas fa-trash-alt" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <li>
        <label className="details__checkbox">
          <input
            onChange={this.handleCheck}
            type="checkbox"
            checked={isLearnt || false}
          />
        </label>
        {wordBlock}
      </li>
    );
  }
}

Word.propTypes = {
  index: PropTypes.number,
  word: PropTypes.object,
  categoryId: PropTypes.string,
  deleteWord: PropTypes.func,
  editWord: PropTypes.func
};

export default Word;
