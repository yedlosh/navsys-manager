import React, {Component} from 'react';
import {Dialog, FlatButton, RaisedButton} from "material-ui";

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div>
        <h1>navsys-manager</h1>
        <h2>Select entity in menu</h2>
      </div>
    )
  }
};
