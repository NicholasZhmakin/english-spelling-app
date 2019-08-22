import * as types from "../types";

export const editWord = (categoryId, newEditedWord) => {
  return {
    type: types.EDIT_WORD,
    payload: { categoryId, newEditedWord }
  };
};
