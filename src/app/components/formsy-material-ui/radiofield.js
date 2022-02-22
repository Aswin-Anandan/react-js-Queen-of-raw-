import React from "react";
import { propTypes, withFormsy } from "formsy-react";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class FormsyRadioField extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  componentDidMount() {
    const value = this.props.value;
    this.props.setValue(value);
    // this.setState({ value });
  }
  changeValue(event) {
    this.props.setValue(
      event.currentTarget[this.props.type === "checkbox" ? "checked" : "value"]
    );
  }

  render() {
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message

    return (  
        <RadioGroup
            // name="gender1"
            // className="{classes.group}"
            value={this.props.value}
            // onChange={this.handleChange}
            // onChange={this.changeValue.bind(this, item)}
            // checked={this.state.value === item}
            >
            {this.props.items.map((item, i) => (              
              <FormControlLabel key={i}
                control={<Radio />} 
                label={item.title} 
                value={item.value} 
                onChange={this.changeValue.bind(this)}
                // checked={i === 0}
              />
            ))}
        </RadioGroup>
    );
  }
}

FormsyRadioField.propTypes = {
  ...propTypes
};

export default withFormsy(FormsyRadioField);
