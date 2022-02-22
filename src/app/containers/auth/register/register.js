import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import RegisterForm from "./register-form";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import './register.css'
import arrow from '../../../../assets/pub/media/onboard/arrow.png'
const mapDispatchToProps = ({ login }) => {
  return {
    ...login
  };
};

const mapStateToProps = ({ login }) => {
  return {
    ...login
  };
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    height: 55,
    paddingTop: 3,
    boxShadow: 'none',
    backgroundColor: '#fff',
    color: '#616468',
    border: '1px solid #c0c1c1',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  breadCrumb: {
    cursor: 'pointer',
    color: theme.palette.primary[400]
  },
  vendor: {
    position: "absolute",
    width: "220px",
    height: "40px",
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "26px",
    lineHeight: "40px",
    color: "#C2C9D1"
  },
  bgColor: {
    textAlign: "center",


    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  headings: {
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "35px",
    lineHeight: "56px"
  },
  formStyle: {
    background: "#FFFFFF",
    border: "1px solid #005EAD",
    boxSizing: "border-box",



    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
 
  }
});

class Register extends Component {

  render() {
    let { loading, classes } = this.props
    return (
      <div id="top-bg1" style={{ backgroundColor: "white" }}>
        <Header />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="body2" color="inherit">
              <span className={classes.breadCrumb}><Link to={`/dashboard`}>Home</Link></span> <img src={arrow}></img>Register
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="top-text1" className={classes.vendor}>&nbsp;&nbsp;&nbsp;Become A Vendor</div>
        <br />
        <div id="top-text2" className={classes.bgColor}>
          
          <div className={classes.formStyle}>
            <RegisterForm loading={loading} onSubmit={this.handleSubmit} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(Register);


