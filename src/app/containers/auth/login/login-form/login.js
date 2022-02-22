import React, { Component } from "react";
import { compose } from "recompose";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faKey } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  layout: {
    display: 'flex',
    backgroundColor: 'black',
    minHeight:'100vh',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    alignItems: 'center',
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
    backgroundColor: "#3D3F3F",
    '&:hover': {
      backgroundColor: "#3D3F3F",
    },
    fontFamily: 'TruenoRegular',
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderRadius:0,
    fontSize:12,
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
  iconStyle:{
    marginLeft:10,
    marginRight:10,
    marginBottom:2,
  },
  minorLinks:{
    fontSize:10,
    fontWeight:700,
    paddingTop:7,
    paddingBottom:7,
    margin:5,
    textAlign: 'center',
    color:'#fff',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing:1,
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
  }
 
});

class LoginForm extends Component {
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
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography variant="display1" className={classes.titleText}>MATERIA MX</Typography>
        <div className={classes.loginLogoDiv}><img className={classes.loginLogo} alt=""/></div>
          <Typography variant="headline" className={classes.loginText}>LOGIN</Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl required fullWidth>
              <Input
                id="email"
                name="username" required autoFocus
                placeholder="Username"
                onChange={this.handleChange("username")}
                className={classes.inputField}
                startAdornment={
                  <InputAdornment position="start" className={classes.iconStyle}>
                     <FontAwesomeIcon icon={faUser} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl required fullWidth>
              <Input
                id="password"
                name="password" required
                type="password"
                placeholder="Password"
                onChange={this.handleChange("password")}
                className={classes.inputField}
                startAdornment={
                  <InputAdornment position="start" className={classes.iconStyle}>
                     <FontAwesomeIcon icon={faKey} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
            >
            {loading ? <CircularProgress size={20}/> : null} LOGIN
            </Button>
          </form>
          <Link to="/forgot-password"><Typography variant="body2" className={`${this.props.classes.minorLinks} ${this.props.classes.minorPadding}`}>Forgot Password?</Typography></Link>
          <Typography variant="body2" className={classes.minorLinks}>© 2018 Materia MX. Queen of Raw All Rights Reserved</Typography>
        </Paper>
      </main>
                         
    );
  }
}
export default compose(withStyles(styles))(LoginForm);
