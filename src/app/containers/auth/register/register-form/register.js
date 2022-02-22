import React, { Component } from "react";
import { compose } from "recompose";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faKey } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../register/register.css'
import img1 from '../../../../../assets/pub/media/onboard/img1.png'


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = name => ev => this.setState({ [name]: ev.target.value });
  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
        let { classes, loading } = this.props;
    return (
      <main>
        <div class="r-top">  
      <h5>CREATE NEW CUSTOMER ACCOUNT </h5>
      </div>
<div className="r-grid">
<div className="le-grid">
<div><p>PERSONAL INFORMATION
</p></div>
<div>
  <span>First Name <span id="red">*</span><input type="text" required></input></span>
</div>
<div>
<span>Last Name <span id="red">*</span><input type="text" required></input></span>
</div>
<div id="ch-box">
<label >Sign Up for Newsletter</label>
<input id="c-box" type="checkbox" />
  </div>
  <div>
    <button>back</button>
  </div>
</div>



<div className="ri-grid">
<div><p>SIGN-IN INFORMATION

</p></div>
<div>
  <span><span id="gapi1">Email <span id="red">*</span></span><input id="i1" type="email" required></input></span>
</div>
<div>
<span><span id="gapi2">Password <span id="red">*</span></span><input id="i2" type="password" required></input></span>
</div>
<div>
<span><span id="gapi">Confirm Password <span id="red">*</span></span><input id="i3" type="password" required></input></span>
</div>
<div id="ch-box">
<label >Remember Me</label>
<input id="c-box2" type="checkbox"/>
  </div>
  <div>
    <button className="cr-btn">create an account</button>
  </div>
</div>
</div>

          <div class="r-img"></div>
          
      </main>
                         
    );
  }
}
export default (RegisterForm);
