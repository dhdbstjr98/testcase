import "normalize.css";
import "./App.css";

import CodeSetting from "./components/CodeSetting";
import TestcaseSetting from "./components/TestcaseSetting";
import { Component } from "react";
import { ReactReduxContext } from "react-redux";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core";

const theme = unstable_createMuiStrictModeTheme();

class App extends Component {
  static contextType = ReactReduxContext;
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleOpen() {
    this.setState({
      open: !this.state.open,
    });
  }
  componentDidMount() {
    this.unscribe = this.context.store.subscribe(() => this.forceUpdate());
  }
  componentWillUnmount() {
    this.unscribe();
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="secondary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography edge="start" variant="h6">
                Testcase
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <CodeSetting />
        <TestcaseSetting />
      </ThemeProvider>
    );
  }
}

export default App;
