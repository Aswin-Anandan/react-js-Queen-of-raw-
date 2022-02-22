import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
import RegisterForm from "./register-details-form";
import Header from "../../../components/header";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import './registerdetails.css'
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
  headings: {
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "35px",
    lineHeight: "56px"
  },
  formStyle: {
    
  },
  registerHeading: {
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "30px",
    lineHeight: "40px",
    letterSpacing: "-0.3px",
    color: "#FFFFFF"
  }
});

class RegisterDetails extends Component {

  render() {
    let { loading, classes } = this.props
    return (
      <div>
      <div style={{ backgroundColor: "white" }}>
        <Header />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="body2" color="inherit">
              <span className={classes.breadCrumb}><Link to={`/dashboard`}>Home</Link></span> <img src={arrow}></img> Register
            </Typography>
          </Toolbar>
        </AppBar>
        <div id="vendor" className={classes.vendor}>&nbsp;&nbsp;&nbsp;Become A Vendor</div>
        <br /><br />
      </div>
      <div id="rd-bg" className={classes.bgColor}>
        <div>
          <h3 className={classes.registerHeading}>Register Now - Become A Vendor</h3>
          
        </div>
        </div>
        <div className={classes.formStyle}>
            <RegisterForm loading={loading} onSubmit={this.handleSubmit} />
          </div>
      </div>
    );
  }
}

RegisterDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(RegisterDetails);


