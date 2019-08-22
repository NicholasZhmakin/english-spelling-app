import mainReducer from "./mainReducer";
import pageReducer from "./pageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  mainR: mainReducer,
  pageR: pageReducer
});

export default rootReducer;
