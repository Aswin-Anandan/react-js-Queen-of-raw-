import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Formsy from "formsy-react";
import Button from "@material-ui/core/Button";
import FormsyTextField from "../../../components/formsy-material-ui/textfield";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faKey,faUser,faLock } from '@fortawesome/free-solid-svg-icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    data.mobile_access = this.state.mobile_access;
    delete data.company
    console.log(data)
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

  masterCheck(){
    this.setState({mobile_access: this.state.mobile_access  === 'YES'? "NO" : "YES"});
  };
  componentDidMount(){
   if(this.props.user && this.props.user.mobile_access )
      this.setState({mobile_access:this.props.user.mobile_access})
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
                 <FormsyTextField name="username" title="Name"  value={this.props.user.username} icon={<FontAwesomeIcon icon={faUser}/>}required />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                 <FormsyTextField name="app_id" title="API ID" value={this.props.user.key ? this.props.user.key.app_id : ''}   icon={<FontAwesomeIcon icon={faKey}/>} />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                <FormsyTextField name="email" title="Email" value={this.props.user.email} icon={<FontAwesomeIcon icon={faEnvelope}/>} required />
               </div>
            </div>
        
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                  <FormsyTextField name="fname" title="First Name"  value={this.props.user.fname}  icon={<FontAwesomeIcon icon={faUser}/>} required />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                  <FormsyTextField name="password" type="password" title="Password"   icon={<FontAwesomeIcon icon={faLock}/>}  />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                 <FormsyTextField name="app_key" title="API Key" value={this.props.user.key ? this.props.user.key.app_key : '' }   icon={<FontAwesomeIcon icon={faKey}/>} />
               </div>
            </div>
           
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                   <FormsyTextField name="lname" title="Last Name"  value={this.props.user.lname}  icon={<FontAwesomeIcon icon={faUser}/>} required />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
               <div class="form-group-block">
                  <FormsyTextField name="company" title="Company" value={this.props.user.company && this.props.user.company.vendor_name ? this.props.user.company.vendor_name : ''}  disabled={true}  icon={<FontAwesomeIcon icon={faUser}/>} required />
               </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4">
              <div class="form-group-block  form-check">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.mobile_access === "YES" ? true : false}
                      onChange={this.masterCheck}
                      value={this.state.mobile_access}
                    />
                  }
                  label="Mobile Access"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
               <div class="form-group-block">
                  <Button variant="contained" color="primary" type="submit"
                disabled={!this.state.canSubmit}>Update</Button>
               </div>
            </div>
      </div>

     </Formsy>
    );
  }
}

export default compose(withStyles(styles))(Form);

