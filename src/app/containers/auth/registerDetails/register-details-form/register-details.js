import React, { Component } from "react";
import { compose } from "recompose";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from "../../../../components/footer";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../registerDetails/registerdetails.css'

const styles = theme => ({
  layout: {
    width: "25%",
    margin: "10px",
    padding: "5px",
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: 'block',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    backgroundColor: 'black',
    // backgroundColor: 'green',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    // marginTop: theme.spacing.unit * 3,
    backgroundColor: "#005EAD",
    '&:hover': {
      backgroundColor: "#005EAD",
    },
    color: "#FFFFFF",
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontStyle: 'normal',
    borderRadius:0,
    fontSize:14,
    marginBottom:10,
    marginTop:40,
    // fontWeight:700
  },
  titleText:{
    fontFamily: 'TruenoLight',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color:'#fff',
    marginBottom: 75
  },
  loginText:{
    fontFamily: 'TruenoLight',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color:'#fff'
  },
  inputField:{
    backgroundColor:'#fff',
    fontSize:10,
    fontWeight:700,
    paddingTop:7,
    paddingBottom:7,
    marginTop:5,
    marginBottom:5
  },
  selectField:{
    backgroundColor:'#fff',
    fontSize:10,
    fontWeight:700,
    paddingTop:7,
    paddingBottom:7,
    marginTop:5,
    marginBottom:5
  },
  iconStyle:{
    marginLeft:10,
    marginRight:10,
    marginBottom:2,
  },
  minorLinks:{
    fontFamily: "Open Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#5E5E5E",
  },
  minorPadding:{
    marginBottom:75,
    cursor:'pointer'
  },
  loginLogo: {
    content: `url("${theme.loginLogoUrl}")`
  },
  loginLogoDiv: {
    textAlign: 'center'
  },
  submitBg: {
    background: "#EBF5FF",
    borderRadius: "0px"
  }
 
});

class RegisterDetailsForm extends Component {
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
      <div>
      <main className={classes.layout}>
        <div className={classes.loginLogoDiv}><img className={classes.loginLogo} alt=""/></div>
          <Typography variant="headline" className={classes.loginText}>LOGIN</Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>






          <div className="form-grid">

          <div className="g1">
            <FormControl required fullWidth>
              <Input
                id="shopName"
                name="shopName" required autoFocus
                placeholder="Shop Name"
                onChange={this.handleChange("shopName")}
                className={classes.inputField}
               
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="phoneNumber"
                name="phoneNumber" required autoFocus
                placeholder="Phone Number"
                onChange={this.handleChange("phoneNumber")}
                className={classes.inputField}
               
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="email"
                name="email" required autoFocus
                placeholder="Email"
                onChange={this.handleChange("email")}
                className={classes.inputField}
                
              />
            </FormControl>
            <FormControl required fullWidth>
              <select>
              <option id="op-color" value="" disabled selected>&nbsp;&nbsp;Preferred Shipping Carrier </option>
              
              </select>

            </FormControl>
            <span id="grey"><button id="rd-btn">Upload Logo</button>&nbsp;&nbsp;&nbsp;No file chosen </span>
            <FormControl required fullWidth>
              <Input type="text-box"
                id="ask"
                name="ask" required autoFocus
                placeholder="Want to know anything else? Just ask! "
                onChange={this.handleChange("ask")}
                className={classes.inputField}
                
              />
            </FormControl>
            </div>



              

              <div className="g2">
                        <span id="grey">
                        <input id="radio-btn" type="radio"/>
                        <label>Independent Designer</label>
                        <input id="radio-btn" type="radio"/>
                        <label>Company</label>
                        </span>
            <FormControl required fullWidth>
              <Input
                id="SupplierContact"
                name="SupplierContact" required autoFocus
                placeholder="Supplier Contact"
                onChange={this.handleChange("SupplierContact")}
                className={classes.inputField}
                
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="streetAddress"
                name="streetAddress" required autoFocus
                placeholder="Street Address"
                onChange={this.handleChange("streetAddress")}
                className={classes.inputField}
                
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="streetAddress2"
                name="streetAddress2" required autoFocus
                placeholder="Street Address Line 2"
                onChange={this.handleChange("streetAddress2")}
                className={classes.inputField}
                
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="city"
                name="city" required autoFocus
                placeholder="City"
                onChange={this.handleChange("city")}
                className={classes.inputField}
                
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="zip"
                name="zip" required autoFocus
                placeholder="Zip/Postal Code"
                onChange={this.handleChange("zip")}
                className={classes.inputField}
               
              />
            </FormControl>
            <FormControl required fullWidth>
              <select>
              <option id="op-color" value="" disabled selected>&nbsp;&nbsp;Region/State/Province</option>
              
              </select>

            </FormControl>
            </div>
            </div>
            <br />
            <br />

        <div id="rd-bg">
        <div>
          <h3 >Select Membership</h3>
        </div>
        </div>
        
                      <div id="bottom-radio">
                        <input id="radio-btn" type="radio"/>
                        <label>Freemium (Makers/Crafters/Independent Designers)</label><br />
                        <input id="radio-btn2" type="radio"/>
                        <label>MateriaMX-Pro (Contact Us for Pricing)</label>
                       </div>



                <div id="last-section" className={classes.submitBg}>
                <div><p>Contact Email For PricingHere@gmail.com</p></div>
                <Button id="btn-rd"
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
            {loading ? <CircularProgress size={20}/> : null} Register Now
            </Button>
                </div>
          </form>
      
      </main>
      <Footer />
                </div>         
    );
  }
}
export default compose(withStyles(styles))(RegisterDetailsForm);
