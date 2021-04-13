import { createStore, combineReducers, applyMiddleware } from "redux";
import codeReducer from "./reducers/codeReducer";
import testcasesReducer from "./reducers/testcasesReducer";
import { DEFAULT } from "./constants";

const defaultState = {
  code: DEFAULT.CODE,
  testcases: DEFAULT.TESTCASES,
};

const logger = (store) => (next) => (action) => {
  console.groupCollapsed("dispatch", action.type);
  console.log("before", store.getState());
  console.log("action", action);
  next(action);
  console.log("after", store.getState());
  console.groupEnd();
};

const saver = (store) => (next) => (action) => {
  let result = next(action);
  localStorage["redux-store"] = JSON.stringify(store.getState());
  return result;
};

const storeFactory = (initialState = defaultState) =>
  applyMiddleware(logger, saver)(createStore)(
    combineReducers({ code: codeReducer, testcases: testcasesReducer }),
    localStorage["redux-store"]
      ? JSON.parse(localStorage["redux-store"])
      : initialState
  );

export default storeFactory;
