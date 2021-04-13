import { ACTION } from "../constants";

export const add = (name) => ({
  type: ACTION.TESTCASE.ADD,
  name,
});

export const setName = (idx, name) => ({
  type: ACTION.TESTCASE.SET_NAME,
  idx,
  name,
});

export const setInput = (idx, input) => ({
  type: ACTION.TESTCASE.SET_INPUT,
  idx,
  input,
});

export const setOutput = (idx, output) => ({
  type: ACTION.TESTCASE.SET_OUTPUT,
  idx,
  output,
});

export const setResult = (idx, result, time) => ({
  type: ACTION.TESTCASE.SET_RESULT,
  idx,
  result,
  time,
});

export const setLoading = (idx, loading) => ({
  type: ACTION.TESTCASE.SET_LOADING,
  idx,
  loading,
});

export const remove = (idx) => ({
  type: ACTION.TESTCASE.REMOVE,
  idx,
});

export const clear = () => ({
  type: ACTION.TESTCASE.CLEAR,
});

export const clearResult = () => ({
  type: ACTION.TESTCASE.CLEAR_Result,
});

const testcaseAction = {
  add,
  setName,
  setInput,
  setOutput,
  setResult,
  setLoading,
  remove,
  clear,
  clearResult,
};

export default testcaseAction;
