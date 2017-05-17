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
import {FlatButton, FloatingActionButton} from "material-ui";
import ContentAdd from 'material-ui/svg-icons/content/add';

import * as config from '../../config';
import * as constants from "../../constants";
import {Col, Container, Row} from "react-grid-system";
import NavigatorEditForm from "./NavigatorEditForm";



export default class Navigators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      newForm: false
    };
  }

  async componentDidMount() {
    await this.fetchNavigators();
  }

  fetchNavigators = async () => {
    try {
      const result = await axios.get(config.API_URL + constants.API_ENDPOINT_NAVIGATORS);
      if(result.data.success) {
        this.setState({navigators: result.data.payload});
      }
    } catch (error) {
      console.log("Navigators: Get navigators error: " + error);
    }
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

  handleOpenNewForm = (event) => {
    this.setState({
      newForm: !this.state.newForm
    });
  };

  handleNavigatorSave = async (navigator) => {
    console.log("Saving: " + JSON.stringify(navigator));
    this.verifyNavigatorIntegrity(navigator);
    const result = await axios.put(config.API_URL + constants.API_ENDPOINT_NAVIGATORS + `/${navigator.id}`, navigator);
    if(result.data.success) {
      await this.fetchNavigators();
    }
  };

  handleNavigatorSaveNew = async (navigator) => {
    await this.handleNavigatorSave(navigator);
    this.setState({
      newForm: false
    });
  };

  handleNavigatorRemove = async (index) => {
    const navigatorId = this.state.navigators[index].id;
    console.log("Removing: " + navigatorId);
    const result = await axios.delete(config.API_URL + constants.API_ENDPOINT_NAVIGATORS + `/${navigatorId}`);
    if(result.data.success) {
      await this.fetchNavigators();
    }
  };

  verifyNavigatorIntegrity = (navigator) => {
      return navigator.id && navigator.mac && navigator.strip;
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
            <TableRowColumn>
              <FlatButton
                label="Remove"
                secondary={true}
                onTouchTap={() => this.handleNavigatorRemove(index)}
              />
            </TableRowColumn>
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
            <TableHeaderColumn />
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
            {this.state.newForm &&
            <NavigatorEditForm style={{position:'fixed', bottom: 72, right: 200}}
              isNew={true}
              onSaveEdit={this.handleNavigatorSaveNew}
            />
            }
        <FloatingActionButton
          style={{position:'fixed', bottom: 72, right: 72}}
          onTouchTap={this.handleOpenNewForm}
        >
          <ContentAdd />
        </FloatingActionButton>
      </Container>
    );
  }
}
