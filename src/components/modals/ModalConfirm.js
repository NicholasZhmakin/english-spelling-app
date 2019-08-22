import React from "react";
import PropTypes from "prop-types";

const ModalConfirm = ({
  deleteCategory,
  deletedCategory,
  closeConfirmModal
}) => {
  return (
    <section className="modal">
      <div className="modal__content">
        <h2>
          Are u sure u want delete <strong>{deletedCategory.name} </strong>
          category?
        </h2>
        <div className="modal_confirm-btns">
          <button
            onClick={() => {
              deleteCategory(deletedCategory.id);
              closeConfirmModal();
            }}
          >
            yes
          </button>
          <button
            onClick={() => {
              closeConfirmModal();
            }}
          >
            no
          </button>
        </div>
      </div>
    </section>
  );
};

ModalConfirm.propTypes = {
  deleteCategory: PropTypes.func,
  closeConfirmModal: PropTypes.func,
  deletedCategory: PropTypes.object
};

export default ModalConfirm;
