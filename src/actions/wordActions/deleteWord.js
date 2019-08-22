import * as types from "../types";

export const deleteWord = (categoryId, wordId) => {
  return {
    type: types.DELETE_WORD,
    payload: { categoryId, wordId }
  };
};
