import * as types from "../types";

export const deleteCategory = id => {
  return {
    type: types.DELETE_CATEGORY,
    payload: id
  };
};
