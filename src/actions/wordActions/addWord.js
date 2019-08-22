import * as types from "../types";

export const addWord = (categoryId, newWord) => {
  return {
    type: types.ADD_WORD,
    payload: { categoryId, newWord }
  };
};
