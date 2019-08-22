import * as types from "../types";

export const editCategory = newEditedCategory => {
  return {
    type: types.EDIT_CATEGORY,
    payload: newEditedCategory
  };
};
