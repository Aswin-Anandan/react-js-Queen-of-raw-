import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Formsy from "formsy-react";
import Button from "@material-ui/core/Button";
import FormsyTextField from "../../../components/formsy-material-ui/textfield";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faKey,faLock,faUser } from '@fortawesome/free-solid-svg-icons'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false, mobile_access: true };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submit = this.submit.bind(this);
    this.masterCheck = this.masterCheck.bind(this);
  }

  submit(data) {
    data.company = this.state.company
    data.mobile_access = this.state.mobile_access;
    if(this.state.mobile_access === true) {
      data.mobile_access = "YES"
    } else {
      data.mobile_access = "NO"
    }
    if(this.props.onSubmit)
      return this.props.onSubmit(data);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }
  disableButton() {
    this.setState({ canSubmit: false });
  }
  resetForm() {
    this.refs.form.reset();
  }

  masterCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  handleChanges = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentDidMount(){
    if(this.props.vendors && this.props.vendors.length ){
      this.setState({company:this.props.vendors[0].vendor_id})
    }
  }

  render() {

    return (
      <Formsy
        onSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        ref="form"
      >
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                 <FormsyTextField name="username" title="Name"   icon={<FontAwesomeIcon icon={faUser}/>}required  class="form-control"/>
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                 <FormsyTextField name="app_id" title="API ID"   icon={<FontAwesomeIcon icon={faKey}/>} />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                 <FormsyTextField name="email" title="Email"  icon={<FontAwesomeIcon icon={faEnvelope}/>} required />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                 <FormsyTextField name="app_key" title="API Key"   icon={<FontAwesomeIcon icon={faKey}/>} />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                  <FormsyTextField name="password" type="password" title="Password"   icon={<FontAwesomeIcon icon={faLock}/>} required />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <div class="form-group-block">
                <FormsyTextField name="firstname" title="First Name"   icon={<FontAwesomeIcon icon={faUser}/>} required />
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                  <FormsyTextField name="lastname" title="Last Name"   icon={<FontAwesomeIcon icon={faUser}/>} required />
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <div class="form-group-block">
              <InputLabel   htmlFor="age-required">Company</InputLabel>

                 <FormControl required style={{ width: "100%" }}>
                     <Select
                          value={this.state.company}
                          required
                          onChange={this.handleChanges.bind(this)}
                          name="company"
                        >
                          {this.props && this.props.vendors && this.props.vendors.length ?
                            this.props.vendors.map((vendor, i) => (
                              <MenuItem
                                value={vendor.vendor_id}
                                key={i}
                              >
                                {vendor.vendor_name}
                              </MenuItem>
                            )) : ""}
                        </Select>
                           
                      </FormControl>

                {/* <FormsyTextField name="company" title="Company"   icon={<FontAwesomeIcon icon={faUser}/>} required /> */}
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <div class="form-group-block form-check">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.mobile_access}
                      onChange={this.masterCheck('mobile_access')}
                      value={this.state.mobile_access}
                    />
                  }
                  label="Mobile Access"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
                <Button variant="contained" color="primary" type="submit"
                disabled={!this.state.canSubmit} class="btn-primary"> Add </Button>
            </div>


        </div>
        
      </Formsy>
    );
  }
}

export default compose(withStyles(styles))(Form);

