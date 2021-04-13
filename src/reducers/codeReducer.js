import { DEFAULT, ACTION } from "../constants";

const codeReducer = (state = DEFAULT.CODE, action) => {
  switch (action.type) {
    case ACTION.CODE.SET_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ACTION.CODE.SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    case ACTION.CODE.SET_TIME:
      return {
        ...state,
        time: action.time,
      };
    case ACTION.CODE.CLEAR:
      return DEFAULT.CODE;
    default:
      return state;
  }
};

export default codeReducer;
