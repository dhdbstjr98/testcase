import "./Testcase.css";

import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import TestResult from "./TestResult";

import DeleteIcon from "@material-ui/icons/Delete";
import { useContext, useRef } from "react";
import { ReactReduxContext } from "react-redux";
import testcaseAction from "./../actions/testcaseAction";
import SendIcon from "@material-ui/icons/Send";
import compileApi from "../api/compileApi";
import executeApi from "./../api/executeApi";

const Testcase = ({ currentIdx, setCurrentIdx }) => {
  const { store } = useContext(ReactReduxContext);
  const { code, testcases } = store.getState();

  const inputInput = useRef(null);
  const inputOutput = useRef(null);

  const handleRemoveClick = () => {
    const nextCurrentIdx = testcases.length === 1 ? "" : testcases.length - 2;
    store.dispatch(testcaseAction.remove(currentIdx));
    setCurrentIdx(nextCurrentIdx);
  };

  const handleNameChange = (evt) => {
    store.dispatch(testcaseAction.setName(currentIdx, evt.target.value));
  };

  const handleInputChange = (evt) => {
    store.dispatch(testcaseAction.setInput(currentIdx, evt.target.value));
  };

  const handleOutputChange = (evt) => {
    store.dispatch(testcaseAction.setOutput(currentIdx, evt.target.value));
  };

  const handleTestClick = () => {
    store.dispatch(testcaseAction.setLoading(currentIdx, true));
    compileApi(code.language, code.text).then(
      () => {
        executeApi(code.language, code.time, testcases[currentIdx].input).then(
          ({ result, time }) => {
            store.dispatch(testcaseAction.setResult(currentIdx, result, time));
          },
          (err) => {
            store.dispatch(testcaseAction.setResult(currentIdx, err, 0));
          }
        );
      },
      (err) => {
        store.dispatch(testcaseAction.setResult(currentIdx, err, 0));
      }
    );
  };

  const handleInputCopyClick = () => {
    inputInput.current.querySelector("textarea").select();
    document.execCommand("copy");
  };

  const handleOutputCopyClick = () => {
    inputOutput.current.querySelector("textarea").select();
    document.execCommand("copy");
  };

  return (
    <Box>
      <Box display="flex">
        <TextField
          value={testcases[currentIdx].name}
          onChange={handleNameChange}
          className="input-name"
        />
        <Button
          color="secondary"
          variant="contained"
          className="btn-remove-testcase"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={handleRemoveClick}
        >
          삭제
        </Button>
        <Button
          color="primary"
          variant="contained"
          className="btn-test"
          size="small"
          endIcon={<SendIcon />}
          onClick={handleTestClick}
        >
          검사
        </Button>
      </Box>
      <Box className="testcase-result-box">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box>
              <Typography className="testcase-input-title">입력</Typography>
              <Typography
                className="testcase-copy"
                onClick={handleInputCopyClick}
              >
                복사
              </Typography>
            </Box>
            <FormControl className="input-input-wrapper">
              <TextField
                multiline={true}
                rows={20}
                variant="outlined"
                value={testcases[currentIdx].input}
                onChange={handleInputChange}
                ref={inputInput}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography className="testcase-input-title">출력</Typography>
              <Typography
                className="testcase-copy"
                onClick={handleOutputCopyClick}
              >
                복사
              </Typography>
            </Box>
            <FormControl className="input-output-wrapper">
              <TextField
                multiline={true}
                rows={8}
                variant="outlined"
                value={testcases[currentIdx].output}
                onChange={handleOutputChange}
                ref={inputOutput}
              />
            </FormControl>
            {testcases[currentIdx].loading ? (
              <CircularProgress />
            ) : testcases[currentIdx].result !== null ? (
              <TestResult
                result={testcases[currentIdx].result}
                time={testcases[currentIdx].time}
                correct={
                  testcases[currentIdx].output === testcases[currentIdx].result
                }
              />
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Testcase;
