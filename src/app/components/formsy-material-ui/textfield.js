import React from "react";
import { propTypes, withFormsy } from "formsy-react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

class FormsyTextField extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    this.props.setValue(
      event.currentTarget[this.props.type === "checkbox" ? "checked" : "value"]
    );
  }

  render() {
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage();
    return (
      <TextField
        error={this.props.showError()}
        required={this.props.showRequired()}
        multiline={this.props.multiline}
        label={this.props.title}
        value={this.props.getValue() || ""}
        type={this.props.type || "text"}
        onChange={this.changeValue}
        helperText={errorMessage}
        disabled={this.props.disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {this.props.icon || ""} 
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

FormsyTextField.propTypes = {
  ...propTypes
};

export default withFormsy(FormsyTextField);
