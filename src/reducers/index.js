import { combineReducers } from "redux";
import loginStateReducer from "./login_reducer";

const rootReducer = combineReducers({
  loginStateReducer,
});

export default rootReducer;
