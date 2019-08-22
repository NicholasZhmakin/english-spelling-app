import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";

class ModalAdd extends Component {
  state = {
    id: "",
    name: "",
    words: []
  };

  handleChange = e => {
    const id = uuid.v4();
    this.setState({
      id: id,
      name: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (!this.state.name) {
      alert("The fields cant be empty");
      return false;
    } else {
      this.props.addCategory(this.state);
      this.setState({
        name: ""
      });
      this.props.closeAddModal();
    }
  };

  handleOutsideModal = e => {
    if (e.target.className === "modal") {
      this.props.closeAddModal();
    }
  };

  render() {
    return (
      <section onClick={this.handleOutsideModal} className="modal">
        <div className="modal__content">
          <h2>create new category</h2>
          <form onSubmit={this.handleClick} className="modal__form">
            <input
              onChange={this.handleChange}
              className="modal__input"
              type="text"
              required
              autoComplete="off"
              name="category"
              value={this.state.name}
            />
            <label className="modal__label" htmlFor="category">
              <span>name of category</span>
            </label>
          </form>
          <button onClick={this.handleClick} className="modal__btn">
            add
          </button>
        </div>
      </section>
    );
  }
}

ModalAdd.propTypes = {
  addCategory: PropTypes.func,
  closeAddModal: PropTypes.func
};

export default ModalAdd;
