import { DEFAULT, ACTION } from "../constants";

const testcaseReducer = (state = DEFAULT.TESTCASE, action) => {
  switch (action.type) {
    case ACTION.TESTCASE.ADD:
      return {
        name: action.name,
        input: "",
        output: "",
        result: null,
        time: null,
      };
    case ACTION.TESTCASE.SET_NAME:
      return {
        ...state,
        name: action.name,
      };
    case ACTION.TESTCASE.SET_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case ACTION.TESTCASE.SET_OUTPUT:
      return {
        ...state,
        output: action.output,
      };
    case ACTION.TESTCASE.SET_RESULT:
      return {
        ...state,
        result: action.result,
        time: action.time,
        loading: false,
      };
    case ACTION.TESTCASE.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ACTION.TESTCASE.CLEAR_RESULT:
      return {
        ...state,
        correct: null,
        time: null,
      };
    default:
      return state;
  }
};

export default testcaseReducer;
