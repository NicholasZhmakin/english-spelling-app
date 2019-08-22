import * as types from "../types";

export const checkWord = (categoryId, wordId) => {
  return {
    type: types.CHECK_WORD,
    payload: { categoryId, wordId }
  };
};
