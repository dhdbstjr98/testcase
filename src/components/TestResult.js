import "./TestResult.css";

import { Box, FormControl, TextField, Typography } from "@material-ui/core";
import clsx from "clsx";

const TestResult = ({ result, time, correct }) => (
  <Box>
    <Box
      className={clsx({
        "testcase-result-correct": correct,
        "testcase-result-incorrect": !correct,
      })}
    >
      <Typography component="span">결과</Typography>
      <Typography component="span" className="testcase-time">
        ({time}ms)
      </Typography>
    </Box>
    <FormControl className="input-result-wrapper">
      <TextField
        multiline={true}
        rows={8}
        variant="outlined"
        disabled={true}
        value={result}
      />
    </FormControl>
  </Box>
);

export default TestResult;
