import React, {Component} from 'react';
import {RaisedButton, TextField} from "material-ui";

export default class NavigatorEditForm extends Component {
  static propTypes = {
    isNew: React.PropTypes.bool,
    navigator: React.PropTypes.object,
    onSaveEdit: React.PropTypes.func.isRequired,
    style: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    if(props.isNew) {
      this.state = {
        navigator: {}
      };
    } else {
      this.state = {
        navigator: {...props.navigator, strip: JSON.stringify(props.navigator.strip)}
      };
    }
  }

  handleChange = (event, newValue) => {
    switch(event.target.id){
      case 'text-id':
        this.setState({navigator: {...this.state.navigator, id: newValue}});
        break;
      case 'text-ip':
        this.setState({navigator: {...this.state.navigator, ip: newValue}});
        break;
      case 'text-mac':
        this.setState({navigator: {...this.state.navigator, mac: newValue}});
        break;
      case 'text-endings':
        this.setState({navigator: {...this.state.navigator, strip: newValue}});
        break;
    }
  };

  handleSave = (event) => {
    try {
      const navigator = {...this.state.navigator, strip: JSON.parse(this.state.navigator.strip)};
      this.props.onSaveEdit(navigator);
    } catch (error) {
      if(error.name === 'SyntaxError') {
        console.error("That JSON is fucked up.");
      }
    }
  };

  render() {
    return (
      <div style={this.props.style ? this.props.style : {}}>
        {this.props.isNew &&
          <div>
            <TextField
              id="text-id"
              defaultValue={this.state.navigator.id}
              hintText="ID"
              onChange={this.handleChange}
            /><br />
          </div>
        }
        <TextField
          id="text-ip"
          defaultValue={this.state.navigator.ip}
          hintText="IP"
          onChange={this.handleChange}
        /><br />
        <TextField
          id="text-mac"
          defaultValue={this.state.navigator.mac}
          hintText="MAC"
          onChange={this.handleChange}
        /><br />
        <TextField
          id="text-endings"
          defaultValue={this.state.navigator.strip}
          hintText="Strip endings"
          onChange={this.handleChange}
        /><br />
        <RaisedButton label="Save" primary={true} style={{marginTop: 12}} onTouchTap={this.handleSave}/>
      </div>
    );
  }
};
