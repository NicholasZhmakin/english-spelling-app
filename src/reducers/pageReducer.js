import * as types from "../actions/types";

const initState = {
  currentWordsPage: 1
};

const pageReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_PAGE:
      return {
        ...state,
        currentWordsPage: payload
      };
    case types.PREV_PAGE:
      return {
        ...state,
        currentWordsPage: state.currentWordsPage - 1
      };
    case types.NEXT_PAGE:
      return {
        ...state,
        currentWordsPage: state.currentWordsPage + 1
      };
    case types.FIRST_PAGE:
      return {
        ...state,
        currentWordsPage: 1
      };

    default:
      return state;
  }
};

export default pageReducer;
