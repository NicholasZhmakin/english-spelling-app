import * as types from "../types";

export const addCategory = newCategory => {
  return {
    type: types.ADD_CATEGORY,
    payload: newCategory
  };
};
