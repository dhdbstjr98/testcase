export const ACTION = {
  CODE: {
    SET_TEXT: "ACTION_CODE_SET_TEXT",
    SET_LANGUAGE: "ACTION_CODE_SET_LANGUAGE",
    SET_TIME: "ACTION_CODE_SET_TIME",
    CLEAR: "ACTION_CODE_CLEAR",
  },
  TESTCASE: {
    ADD: "ACTION_TESTCASE_ADD",
    SET_NAME: "ACTION_TESTCASE_SET_NAME",
    SET_INPUT: "ACTION_TESTCASE_SET_INPUT",
    SET_OUTPUT: "ACTION_TESTCASE_SET_OUTPUT",
    SET_RESULT: "ACTION_TESTCASE_SET_RESULT",
    SET_LOADING: "ACTION_TESTCASE_SET_LOADING",
    REMOVE: "ACTION_TESTCASE_REMOVE",
    CLEAR: "ACTION_TESTCASE_CLEAR",
    CLEAR_RESULT: "ACTION_TESTCASE_CLEAR_RESULT",
  },
};

export const DEFAULT = {
  CODE: {
    text: "",
    language: "c++",
    time: 5,
  },
  TESTCASES: [],
  TESTCASE: {},
};
