import "./TestcaseSetting.css";

import testcaseAction from "../actions/testcaseAction";
import { ReactReduxContext } from "react-redux";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  IconButton,
  Collapse,
  Card,
  CardContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SendIcon from "@material-ui/icons/Send";
import { useContext, useState } from "react";
import Testcase from "./Testcase";
import compileApi from "../api/compileApi";
import executeApi from "./../api/executeApi";

const TestcaseSetting = () => {
  const { store } = useContext(ReactReduxContext);
  const { code, testcases } = store.getState();

  const [currentIdx, setCurrentIdx] = useState(
    testcases.length > 0 ? testcases.length - 1 : ""
  );

  const handleAddClick = () => {
    const nextCurrentIdx = currentIdx === "" ? 0 : testcases.length;
    store.dispatch(testcaseAction.add(`Testcase #${nextCurrentIdx + 1}`));
    setCurrentIdx(nextCurrentIdx);
  };

  const handleChangeCurrentIdx = (evt) => {
    setCurrentIdx(evt.target.value);
  };

  const handleTestAllClick = () => {
    if (testcases.length === 0) return;
    compileApi(code.language, code.text).then(
      () => {
        const test = (i) => {
          if (i >= testcases.length) return;

          setCurrentIdx(i);

          store.dispatch(testcaseAction.setLoading(i, true));
          executeApi(code.language, code.time, testcases[i].input).then(
            ({ result, time }) => {
              store.dispatch(testcaseAction.setResult(i, result, time));
              if (testcases[i].output === result) test(i + 1);
            },
            (err) => {
              store.dispatch(testcaseAction.setResult(i, err, 0));
            }
          );
        };

        test(0);
      },
      (err) => {
        store.dispatch(testcaseAction.setResult(0, err, 0));
      }
    );
  };

  if (typeof currentIdx === "number" && testcases.length === 0)
    setCurrentIdx(testcases.length > 0 ? testcases.length - 1 : "");

  return (
    <Container maxWidth="md" className="testcase-setting">
      <Box display="flex" className="testcase-top">
        <FormControl>
          <InputLabel>테스트 케이스</InputLabel>
          <Select
            value={currentIdx}
            className="input-current-idx"
            onChange={handleChangeCurrentIdx}
          >
            {testcases.map((testcase, i) => (
              <MenuItem value={i} key={i}>
                {testcase.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton className="btn-add-testcase" onClick={handleAddClick}>
          <AddIcon />
        </IconButton>
        <Button
          color="primary"
          variant="contained"
          className="btn-test-all"
          endIcon={<SendIcon />}
          onClick={handleTestAllClick}
        >
          전체 검사
        </Button>
      </Box>
      <Collapse
        in={
          testcases.length > 0 &&
          typeof currentIdx === "number" &&
          currentIdx >= 0
        }
      >
        <Card className="testcase-body">
          <CardContent>
            {testcases.length > 0 &&
            typeof currentIdx === "number" &&
            currentIdx >= 0 ? (
              <Testcase currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} />
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </Collapse>
    </Container>
  );
};

export default TestcaseSetting;
