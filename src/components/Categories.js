import React, { Component } from "react";
import CardCategory from "./CardCategory";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalAdd from "./modals/ModalAdd";
import ModalEdit from "./modals/ModalEdit";
import ModalConfirm from "./modals/ModalConfirm";
import { addCategory } from "../actions/categoryActions/addCategory";
import { editCategory } from "../actions/categoryActions/editCategory";
import { deleteCategory } from "../actions/categoryActions/deleteCategory";

class Categories extends Component {
  state = {
    addCategoryMode: false,
    editCategoryMode: false,
    confirmDeleteMode: false,
    editedCategory: "",
    deletedCategory: ""
  };

  openAddModal = () => {
    this.setState({
      addCategoryMode: true
    });
  };

  openEditModal = category => {
    this.setState({
      editCategoryMode: true,
      editedCategory: category
    });
  };

  openConfirmModal = category => {
    this.setState({
      confirmDeleteMode: true,
      deletedCategory: category
    });
  };

  closeAddModal = () => {
    this.setState({
      addCategoryMode: false
    });
  };

  closeEditModal = () => {
    this.setState({
      editCategoryMode: false,
      editedCategory: ""
    });
  };

  closeConfirmModal = () => {
    this.setState({
      confirmDeleteMode: false,
      deletedCategory: ""
    });
  };

  render() {
    const {
      addCategoryMode,
      editCategoryMode,
      confirmDeleteMode,
      editedCategory,
      deletedCategory
    } = this.state;
    return (
      <section className="categories">
        {!addCategoryMode ? null : (
          <ModalAdd
            addCategory={this.props.addCategory}
            closeAddModal={this.closeAddModal}
          />
        )}

        {editedCategory === "" || !editCategoryMode ? null : (
          <ModalEdit
            editedCategory={editedCategory}
            editCategory={this.props.editCategory}
            closeEditModal={this.closeEditModal}
          />
        )}

        {!confirmDeleteMode ? null : (
          <ModalConfirm
            deleteCategory={this.props.deleteCategory}
            deletedCategory={deletedCategory}
            closeConfirmModal={this.closeConfirmModal}
          />
        )}

        <header className="categories__title">
          <i className="fas fa-pen-alt" />
          <h1>Choose your category</h1>
          <i className="fas fa-boxes" />
        </header>

        <div className="categories__grid">
          <button onClick={this.openAddModal} className="categories__add-btn">
            <i className="fas fa-plus" />
            <h2>Add new one</h2>
          </button>
          {this.props.categories.map(category => {
            return (
              <CardCategory
                key={category.id}
                category={category}
                openEditModal={this.openEditModal}
                openConfirmModal={this.openConfirmModal}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCategory: newCategory => {
      dispatch(addCategory(newCategory));
    },
    editCategory: newEditedCategory => {
      dispatch(editCategory(newEditedCategory));
    },
    deleteCategory: id => {
      dispatch(deleteCategory(id));
    }
  };
};

const mapStateToProps = state => {
  return {
    categories: state.mainR.categories
  };
};

Categories.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
