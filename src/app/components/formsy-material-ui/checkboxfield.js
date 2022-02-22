import React from "react";
import { propTypes, withFormsy } from "formsy-react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class FormsyCheckboxField extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    const value = this.props.value;
    this.props.setValue(value);
  }

  changeValue(event) {      
    const value = event.currentTarget.checked;
    this.props.setValue(value);
  }

  render() {
    return (    
      <FormControlLabel
          control={
            <Checkbox
              onChange={this.changeValue.bind(this)}
              checked={this.props.value}
              color={this.props.color || "primary"}
            />
          }
          label={this.props.title}
        />
    );
  }
}

FormsyCheckboxField.propTypes = {
  ...propTypes
};

export default withFormsy(FormsyCheckboxField);
