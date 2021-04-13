import { DEFAULT, ACTION } from "../constants";
import testcaseReducer from "./testcaseReducer";

const testcasesReducer = (state = DEFAULT.TESTCASES, action) => {
  switch (action.type) {
    case ACTION.TESTCASE.ADD:
      return [...state, testcaseReducer({}, action)];
    case ACTION.TESTCASE.SET_NAME:
    case ACTION.TESTCASE.SET_INPUT:
    case ACTION.TESTCASE.SET_OUTPUT:
    case ACTION.TESTCASE.SET_RESULT:
    case ACTION.TESTCASE.SET_LOADING:
      return state.map((testcase, i) =>
        action.idx !== i ? testcase : testcaseReducer(testcase, action)
      );
    case ACTION.TESTCASE.REMOVE:
      return state.filter((_, i) => i !== action.idx);
    case ACTION.TESTCASE.CLEAR:
      return DEFAULT.TESTCASES;
    case ACTION.TESTCASE.CLEAR_RESULT:
      return state.map((testcase) => testcaseReducer(testcase, action));
    default:
      return state;
  }
};

export default testcasesReducer;
