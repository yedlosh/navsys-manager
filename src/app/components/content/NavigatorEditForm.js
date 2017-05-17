import React, {Component} from 'react';
import {RaisedButton, TextField} from "material-ui";

export default class NavigatorEditForm extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    onSaveEdit: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      navigator: {...props.navigator, strip: JSON.stringify(props.navigator)}
    };
  }

  handleChange = (event, newValue) => {
    switch(event.target.id){
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
    const navigator = {...this.state.navigator, strip: JSON.parse(this.state.navigator.strip)};
    this.props.onSaveEdit(navigator);
  };

  render() {
    return (
      <div>
        <TextField
          id="text-ip"
          defaultValue={this.state.navigator.ip}
          onChange={this.handleChange}
        /><br />
        <TextField
          id="text-mac"
          defaultValue={this.state.navigator.mac}
          onChange={this.handleChange}
        /><br />
        <TextField
          id="text-endings"
          defaultValue={JSON.stringify(this.state.navigator.strip)}
          onChange={this.handleChange}
        /><br />
        <RaisedButton label="Save" primary={true} style={{marginTop: 12}} onTouchTap={this.handleSave}/>
      </div>
    );
  }
};
