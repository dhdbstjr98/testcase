import { ACTION } from "../constants";

export const setText = (text) => ({
  type: ACTION.CODE.SET_TEXT,
  text,
});

export const setLanguage = (language) => ({
  type: ACTION.CODE.SET_LANGUAGE,
  language,
});

export const setTime = (time) => ({
  type: ACTION.CODE.SET_TIME,
  time,
});

export const clear = () => ({
  type: ACTION.CODE.CLEAR,
});

const codeAction = {
  setText,
  setLanguage,
  setTime,
  clear,
};


export default codeAction
