import { combineReducers } from "redux";
import loginStateReducer from "./login_reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loginStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // 추가

export default persistedReducer;
