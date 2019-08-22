import * as types from "../types";

export const setCurrentPage = number => {
  return {
    type: types.SET_PAGE,
    payload: number
  };
};
