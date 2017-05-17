import React, {Component} from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import * as config from '../../config';
import * as constants from "../../constants";
import {Col, Container, Row} from "react-grid-system";
import NavigatorEditForm from "./NavigatorEditForm";


export default class Navigators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  async componentDidMount() {
    try {
      const result = await axios.get(config.API_URL + constants.API_ENDPOINT_NAVIGATORS);
      if(result.data.success) {
        this.setState({navigators: result.data.payload});
      }
    } catch (error) {
      console.log("Navigators: Get navigators error: " + error);
    }
  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  handleNavigatorSave = (navigator) => {
    console.log("Saving: " + JSON.stringify(navigator));
  };


  render() {
    const {navigators} = this.state;
    let parsedNavigators = [];

    if(navigators && navigators.length > 0) {
      parsedNavigators = navigators.map((navigator, index) =>
          <TableRow key={index} selected={this.isSelected(index)}>
            <TableRowColumn>{navigator.id}</TableRowColumn>
            <TableRowColumn>{navigator.ip}</TableRowColumn>
            <TableRowColumn>{navigator.mac}</TableRowColumn>
            <TableRowColumn>{JSON.stringify(navigator.strip)}</TableRowColumn>
          </TableRow>
      );
    }

    const navigatorsTable = (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>IP</TableHeaderColumn>
            <TableHeaderColumn>MAC</TableHeaderColumn>
            <TableHeaderColumn>Endings</TableHeaderColumn>
          </TableRow>
        </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {parsedNavigators}
          </TableBody>
      </Table>
    );

    return (
      <Container fluid={true}>
        <h1>Navigators</h1>
        <Row>
          <Col sm={7}>
            {navigatorsTable}
          </Col>
          <Col sm={4}  offset={{ sm: 1 }}>
            {(navigators && navigators.length > 0 && this.state.selected.length > 0) &&
              <NavigatorEditForm
                navigator={navigators[this.state.selected[0]]}
                onSaveEdit={this.handleNavigatorSave}
              />
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
