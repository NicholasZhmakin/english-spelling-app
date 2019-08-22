import React, { Component } from "react";
import PropTypes from "prop-types";

class ModalEdit extends Component {
  state = {
    id: this.props.editedCategory.id,
    name: this.props.editedCategory.name,
    words: this.props.editedCategory.words
  };

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (!this.state.name) {
      alert("The fields cant be empty");
      return false;
    } else {
      this.props.editCategory(this.state);
      this.setState({
        id: "",
        name: "",
        words: ""
      });
      this.props.closeEditModal();
    }
  };

  handleOutsideModal = e => {
    if (e.target.className === "modal") {
      this.props.closeEditModal();
    }
  };

  render() {
    return (
      <section onClick={this.handleOutsideModal} className="modal">
        <div className="modal__content">
          <h2>change name of category</h2>
          <form onSubmit={this.handleClick} className="modal__form">
            <input
              onChange={this.handleChange}
              className="modal__input"
              type="text"
              autoComplete="off"
              required
              name="category"
              value={this.state.name}
            />
            <label className="modal__label" htmlFor="category">
              <span>new name of category</span>
            </label>
          </form>
          <button onClick={this.handleClick} className="modal__btn">
            save
          </button>
        </div>
      </section>
    );
  }
}

ModalEdit.propTypes = {
  editCategory: PropTypes.func,
  closeEditModal: PropTypes.func,
  editedCategory: PropTypes.object
};

export default ModalEdit;
