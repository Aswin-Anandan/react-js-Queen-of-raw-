import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import './header.css'
import icon4 from '../../../assets/pub/media/onboard/icon4.png'
import logo from '../../../assets/pub/media/onboard/logo.png'
import icon1 from '../../../assets/pub/media/onboard/icon1.png'
import icon2 from '../../../assets/pub/media/onboard/icon2.png'
import icon3 from '../../../assets/pub/media/onboard/icon3.png'
import Sidebar from '../sidebar'


const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    height: "100%"
  },
  headerMenu: {
    listStyle: "none"
  },
  headerLi: {
    display: "inline",
    fontFamily: "Raleway",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "17px",
    letterSpacing: "0px",
    textAlign: "center",
    flexDirection: "row",
    alignItems: "flexEnd",
    padding: "20px",
    cursor:"pointer",
    width: "71px",
    height: "56px",
    
    bottom: "0px",

    flex: "none",
    order: 2,
    flexGrow: "0",
    margin: "0px 0px"
  }
});

class Header extends React.Component {
  state = {
    open: true
  };

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;


    return (
      
      <div className="header">
      
      <div className="header0">

      
      <div><Sidebar /><p id="top-text">Buy and Sell Sustainable and Deadstock Fabrics</p></div>
      <div>
      <div id="topl">
      <img id="my-ac-img" src={icon4}></img>
      <a id="myac" href="#">My Account </a>
      <a href="#" id="invisible">i</a>
      <a href="#" className="b-r">Sign In</a>
      <a href="#">Help</a>
      </div>
      </div>
      </div>
      <div id="header1" className={classes.root}>
      <div>
        <img className="logo" src={logo}></img>
        </div>
        <div>
          <ul id="links" className={classes.headerUl}>
            <li className={classes.headerLi}><a id="active" href="#">SHOP</a></li>
            <li className={classes.headerLi}><a href="#">ABOUT</a></li>
            <li className={classes.headerLi}><a href="#">SOCIAL</a></li>
            <li className={classes.headerLi}><a href="#">CONTACTS</a></li>
          </ul>
        </div>
        <div className="l-part">
        <div id="s-bar">
          <input id="h-input0" className="s-bar-o" type="text" placeholder="Type a description..."></input>
          <img src="https://img.icons8.com/color/48/000000/search--v1.png"></img> 
        </div>
        <div class="icons">
          <img src={icon1}></img>
          <img src={icon2}></img>
          <img src={icon3}></img>
        </div>
        </div>
      </div>
      <div id="s-bar1">
          <input id="h-input" className="s-bar-o1" type="text" placeholder="Type a description..."></input>
          <img src="https://img.icons8.com/color/48/000000/search--v1.png"></img> 
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
