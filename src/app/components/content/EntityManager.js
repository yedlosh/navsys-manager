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
import EntityEditForm from "./EntityEditForm";



export default class EntityManager extends Component {
  static propTypes = {
    endpointPath: React.PropTypes.string.isRequired,
    entityProperties: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      newForm: false
    };
  }

  async componentDidMount() {
    await this.fetchEntityArray();
  }

  fetchEntityArray = async () => {
    let result;
    try {
      result = await axios.get(config.API_URL + this.props.endpointPath);
    } catch (error) {
      console.log("EntityManager: Fetch error: " + error);
    }
    if(result.data.success) {
      console.log(JSON.stringify(result.data.payload));
      this.setState({dataArray: result.data.payload});
    }
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    console.log("Selected" + JSON.stringify(selectedRows));
    this.setState({
      selected: selectedRows,
    });
  };

  handleOpenNewForm = (event) => {
    this.setState({
      newForm: !this.state.newForm
    });
  };

  handleEntitySave = async (entity) => {
    console.log("Saving: " + JSON.stringify(entity));
    this.verifyEntityIntegrity(entity);
    const result = await axios.put(config.API_URL + this.props.endpointPath + `/${entity.id}`, entity);
    if(result.data.success) {
      await this.fetchEntityArray();
    }
  };

  handleEntitySaveNew = async (entity) => {
    await this.handleEntitySave(entity);
    this.setState({
      newForm: false
    });
  };

  handleEntityRemove = async (index) => {
    const itemId = this.state.dataArray[index].id;
    console.log("Removing: " + itemId);
    const result = await axios.delete(config.API_URL + this.props.endpointPath + `/${itemId}`);
    if(result.data.success) {
      await this.fetchEntityArray();
    }
  };

  verifyEntityIntegrity = (entity) => {
    let satisfied = true;
    this.props.entityProperties.some(property => {
      if(!entity.hasOwnProperty(property.name)){
        satisfied = false;
        return true;
      } else {
        return false;
      }
    });
    return satisfied;
  };

  render() {
    const {dataArray} = this.state;
    let tableRows = [];

    const tableHeaderColumns = this.props.entityProperties.map((property, index) => <TableHeaderColumn key={index}>{property.displayName}</TableHeaderColumn>);

    if(dataArray && dataArray.length > 0) {
      tableRows = dataArray.map((entity, index) => {
        const tableRowColumns = this.props.entityProperties.map((property, index) => <TableRowColumn key={index}>{JSON.stringify(entity[property.name])}</TableRowColumn>);

        return (
        <TableRow key={index} selected={this.isSelected(index)}>
          {tableRowColumns}
          <TableRowColumn>
            <FlatButton
              label="Remove"
              secondary={true}
              onTouchTap={() => this.handleEntityRemove(index)}
            />
          </TableRowColumn>
        </TableRow>
        );
      });
    }

    const entityTable = (
      <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            {tableHeaderColumns}
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {tableRows}
          </TableBody>
      </Table>
    );

    return (
      <Container fluid={true}>
        <Row>
          <Col sm={7}>
            {entityTable}
          </Col>
          <Col sm={4}  offset={{ sm: 1 }}>
            {(dataArray && dataArray.length > 0 && this.state.selected.length > 0) &&
              <EntityEditForm
                entity={dataArray[this.state.selected[0]]}
                entityProperties={this.props.entityProperties}
                onSaveEdit={this.handleEntitySave}
              />
            }
          </Col>
        </Row>
            {this.state.newForm &&
            <EntityEditForm style={{position:'fixed', bottom: 72, right: 200}}
              isNew={true}
              entityProperties={this.props.entityProperties}
              onSaveEdit={this.handleEntitySaveNew}
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
