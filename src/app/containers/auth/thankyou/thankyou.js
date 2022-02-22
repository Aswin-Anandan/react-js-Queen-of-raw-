import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from "prop-types";
// import RegisterForm from "./register-details-form";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import './thankyou.css'
import tick from '../../../../assets/pub/media/onboard/tick.png'
import icon6 from '../../../../assets/pub/media/onboard/icon6.png'
import icon7 from '../../../../assets/pub/media/onboard/icon7.png'
import icon8 from '../../../../assets/pub/media/onboard/icon8.png'
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
    background: "#005EAD",
    textAlign: "center",
    height: "403px",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  thanksHeading: {
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "49px",
    lineHeight: "66px",
    textAlign: "center",
    letterSpacing: "-0.3px",
    color: "#FFFFFF"
  },
  thanksContent: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "24px",
    lineHeight: "42px",
    textAlign: "center",
    letterSpacing: "0.7px",
    color: "#FFFFFF"
  },
  shopButton: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "10px",
    lineHeight: "19px",
    textAlign: "center",
    letterSpacing: "-0.3px",
    color: "#FFFFFF",
    alignItems: "center"
  },
  innerContent: {
    position: "relative",
    top: "50%",
    "-webkit-transform": "translateY(-50%)",
    "-ms-transform": "translateY(-50%)",
    transform: "translateY(-50%)"
  },
  optionHeading: {
    fontFamily: "Abril Fatface",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "41px",
    lineHeight: "173.75%",
    textAlign: "center",
    color: "#000000"
  }

});

class ThankYou extends Component {

  render() {
    let { classes } = this.props
    return (
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
        <div className={classes.bgColor}>
        <img id="tick" src={tick} />
          <div className={classes.innerContent}>
            <h3 id="t-h" className={classes.thanksHeading}>Thanks for registering!</h3>
            <p id="t-p" className={classes.thanksContent}>
              Your application has been received and is being processed.<br />
              You will receive a confirmation email with a link to your supplier log in shortly.
            </p>
            <Button id="t-button" variant="outlined" className={classes.shopButton} color="primary"> <p>Shop Queen of Raw </p></Button>
          </div>
        </div>
        <br />
        <div id="t-bottom">   
        <div>     <h3 id="t-b-t" className={classes.optionHeading}>Queen Of Raw Supplier’s Can:</h3>
        <div className="t-grid">
          <div><img src={icon6}></img><h4>Add/Edit 
Profile Informaion</h4></div>
          <div><img src={icon7}></img><h4>Add/Manage 
Products and Orders</h4></div>
          <div><img src={icon8}></img><h4>View Transaction 
History and Reports</h4></div>
</div>
        </div>
        </div>

        <Footer />
      </div>
    );
  }
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps, mapDispatchToProps))(ThankYou);


