import React, {Component} from 'react';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {deepOrange500, red700, blueGrey300} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from "material-ui/AppBar";

import SideMenu from "./SideMenu";
import ContentRouter from "../ContentRouter";

const styles = {
  container: {
    minHeight: 400,
    paddingLeft: 256
  },
  content: {
    marginTop: 48,
    marginBottom: 48,
    marginLeft: 72,
    marginRight: 72
  }
};

// const muiTheme = getMuiTheme({
//     ...darkBaseTheme,
//   palette: {
//     ...darkBaseTheme.palette,
//     primary1Color: blueGrey300,
//     primary2Color: red700,
//     accent1Color: deepOrange500,
//   },
// });
const muiTheme = getMuiTheme();

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar />
          <div style={styles.container}>
            <SideMenu />
            <div style={styles.content}>
              <ContentRouter />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
