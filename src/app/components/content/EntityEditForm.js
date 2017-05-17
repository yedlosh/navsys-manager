import React, {Component} from 'react';
import {RaisedButton, TextField} from "material-ui";

export default class NavigatorEditForm extends Component {
  static propTypes = {
    isNew: React.PropTypes.bool,
    entity: React.PropTypes.object,
    entityProperties: React.PropTypes.array.isRequired,
    onSaveEdit: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    if(props.isNew) {
      this.state = {
        entity: {}
      };
    } else {
      this.state = {
        entity: this.stringifyEntity(this.props.entity, this.props.entityProperties)
      };
    }
  }

  stringifyEntity = (entity, entityProperties) => {
    return entityProperties.reduce((acc, property) => {
      if(typeof(entity[property.name]) === "object"){
        return {...acc, [property.name]: JSON.stringify(entity[property.name])}
      } else {
        return {...acc, [property.name]: entity[property.name]}
      }
    },{});
  };

  componentWillReceiveProps(nextProps) {
    console.log("New Props:" + JSON.stringify(nextProps));
    if(nextProps.isNew) {
      this.setState({
        entity: {}
      });
    } else {
      this.setState({
        entity: this.stringifyEntity(nextProps.entity, nextProps.entityProperties)
      });
    }
  }

  handleChange = (event, newValue) => {
    this.setState({entity: {...this.state.entity, [event.target.id]: newValue}});
  };

  handleSave = (event) => {
    try {
      const parsedProps = this.props.entityProperties.reduce((acc, property) =>  {
        if(property.parse && this.state.entity[property.name] !== undefined) {
          return {...acc, [property.name]: JSON.parse(this.state.entity[property.name])};
        } else {
          return {...acc, [property.name]: this.state.entity[property.name]};
        }
      },{});

      const entity = {...this.props.entity, ...parsedProps};
      this.props.onSaveEdit(entity);
    } catch (error) {
      if(error.name === 'SyntaxError') {
        console.error("Value cannot be parsed");
        // TODO show errors in form
      }
    }
  };

  render() {
    console.log("Rendering state:" + JSON.stringify(this.state));

    const textFields = this.props.entityProperties.map((property, index) => {
      if(property.name === 'id' && !this.props.isNew) return null;
      console.log(this.state.entity[property.name]);
      return (
        <div key={index}>
          <TextField
            id={property.name}
            value={this.state.entity.hasOwnProperty(property.name) ?
                    this.state.entity[property.name] === undefined ?
                      ""
                      : this.state.entity[property.name]
                    : ""}
            hintText={property.displayName}
            onChange={this.handleChange}
            multiLine={true}
          /><br />
        </div>
      )
    });

    return (
      <div style={this.props.style ? this.props.style : {}}>
        {textFields}
        <RaisedButton label="Save" primary={true} style={{marginTop: 12}} onTouchTap={this.handleSave}/>
      </div>
    );
  }
};
