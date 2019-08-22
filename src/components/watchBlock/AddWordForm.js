import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid";

class AddWordForm extends Component {
  state = {
    id: "",
    origin: "",
    translation: ""
  };

  handleChange = e => {
    const id = uuid.v4();
    this.setState({
      id: id,
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (!this.state.origin || !this.state.translation) {
      alert("The fields cant be empty");
      return false;
    } else {
      this.props.addWord(this.props.categoryId, this.state);
      this.setState({
        id: "",
        origin: "",
        translation: ""
      });
    }
  };

  render() {
    const { origin, translation } = this.state;
    return (
      <section className="add-word__box">
        <form onSubmit={this.handleClick} className="add-word__form">
          <div>
            <label htmlFor="origin">origin</label>
            <input
              onChange={this.handleChange}
              type="text"
              autoComplete="off"
              name="origin"
              value={origin}
            />
          </div>
          <div>
            <label htmlFor="translation">translation</label>
            <input
              onChange={this.handleChange}
              type="text"
              autoComplete="off"
              name="translation"
              value={translation}
            />
          </div>
          <button
            className="add-word__btn"
            onClick={this.handleClick}
            type="submit"
            value="add new word"
          >
            <i className="fas fa-plus" />
          </button>
        </form>
      </section>
    );
  }
}

AddWordForm.propTypes = {
  addWord: PropTypes.func,
  categoryId: PropTypes.string
};

export default AddWordForm;
