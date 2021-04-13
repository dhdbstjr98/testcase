import "./CodeSetting.css";

import codeAction from "../actions/codeAction";
import testcaseAction from "../actions/testcaseAction";
import { ReactReduxContext } from "react-redux";
import clsx from "clsx";
import {
  Container,
  Typography,
  Card,
  CardActions,
  IconButton,
  Collapse,
  CardContent,
  Box,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { useContext, useState } from "react";

const CodeSetting = () => {
  const { store } = useContext(ReactReduxContext);
  const { code } = store.getState();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLanguageChange = (evt) => {
    store.dispatch(codeAction.setLanguage(evt.target.value));
  };

  const handleTimeChange = (evt) => {
    store.dispatch(codeAction.setTime(evt.target.value));
  };

  const handleTextChange = (evt) => {
    store.dispatch(codeAction.setText(evt.target.value));
  };

  const handleClearAll = () => {
    store.dispatch(codeAction.clear());
    store.dispatch(testcaseAction.clear());
  };

  return (
    <Container maxWidth="md" className="code-setting">
      <Card>
        <CardActions className="expand-menu" onClick={handleExpandClick}>
          <Typography style={{ paddingLeft: "10px" }}>코드 설정</Typography>
          <IconButton
            className={clsx("btn-expand", { "expand-open": expanded })}
          >
            <ExpandMore />
          </IconButton>
        </CardActions>
        <Collapse in={expanded}>
          <CardContent>
            <Box display="flex" className="code-top">
              <FormControl>
                <InputLabel>사용 언어</InputLabel>
                <Select
                  className="input-language"
                  value={code.language}
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="c++">C++</MenuItem>
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="pypy3">Pypy3</MenuItem>
                  <MenuItem value="nodejs">Node.js</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  label="제한 시간(초)"
                  className="input-time"
                  value={code.time}
                  type="number"
                  onChange={handleTimeChange}
                />
              </FormControl>
              <Button
                className="btn-clear-all"
                variant="contained"
                color="secondary"
                onClick={handleClearAll}
              >
                초기화
              </Button>
            </Box>
            <Box className="code-box">
              <FormControl className="input-code-wrapper">
                <TextField
                  label="코드"
                  multiline={true}
                  rows={20}
                  value={code.text}
                  onChange={handleTextChange}
                  variant="outlined"
                />
              </FormControl>
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
};

export default CodeSetting;
