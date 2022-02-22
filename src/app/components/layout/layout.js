import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import MenuAppBar from "../../components/icon";
import { Menu, ChevronLeft } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  // faCode
} from "@fortawesome/free-solid-svg-icons";
// import MaterialIcon from "../../components/MaterialIcon";
import { getCookie } from "../../helpers/utility";

const drawerWidth = 241;

window.onload = function(e){ 
  if( document.documentElement.clientWidth < 767 || window.innerWidth  < 767 ) {
    document.querySelector('.menu-toggle-btn').click();  
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    height: "100%"
  },
  menuItem: {
    color: "#fff",
    padding: 0
  },
  menuItemIcon: {
    color: theme.palette.primary[400]
  },
  menuItemIconDeselect: {
    color: "#fff"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  listItem: {
    padding: 15,
    minHeight:50,
    "&:hover": {
      backgroundColor: "#2196F3"
    }
  },
  brand: {
    paddingTop: "21px",
    position: "relative",
    marginLeft: "70px",
    fontWeight: "bold",
    textTransform: "uppercase",
    height: "44px"
  },
  appBar: {
    height: 65,
    boxShadow: "none",
    backgroundColor: "#fff",
    color: "#616468",
    border: "1px solid #c0c1c1",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // marginLeft: 75,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: "none"
  },
  divider: {
    backgroundColor: "#ffffff"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    backgroundColor: "#33373C",
    minHeight: "100vh",
    color: "#FFFFFF",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 7
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
    // ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    width: `calc(100vw - ${drawerWidth}px)`
    // padding: theme.spacing.unit * 3
  },
  switch: {
    paddingTop: "50px"
  },
  logoText: {
    fontSize: 15,
    fontWeight: 700,
    width: drawerWidth
  },
  logoItems: {
    width: drawerWidth
  },
  upperLeftLogo:{
    height: 24,
    width: 24
  },
  navButton: {
    textTransform: "none",
    fontWeight: 400,
    color: "#737F8C",
    [theme.breakpoints.up("md")]: {
      margin: 10
    },
    [theme.breakpoints.down("md")]: {
      margin: 1
    }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    backgroundColor: theme.palette.text.secondary
  },
  selected: {
    backgroundColor: theme.palette.primary[400],
    "&:hover": {
      backgroundColor: theme.palette.primary[400]
    }
  },
  list: {
    paddingTop: 20,
    padding: 0
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: true
  };
  
  componentDidMount(){
    document.body.classList.add('main-menu-open')
  }

  handleResponsiveDrawer = () => {
  if( document.documentElement.clientWidth < 768 || window.innerWidth  < 768 ) {
    this.setState(prevState => ({
      open: !prevState.open
    }));
    this.state.open ? document.body.classList.remove('main-menu-open') : document.body.classList.add('main-menu-open')
  }
  }


  handleDrawerOpen = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
    this.state.open ? document.body.classList.remove('main-menu-open') : document.body.classList.add('main-menu-open')
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    document.body.classList.remove('main-menu-open')
  };

  isActive(link) {
    if (window.location.href.indexOf(link) > -1) return true;
  }

  render() {
    const { classes,user,settings } = this.props;

    const img = (
      <img style={{ marginTop: 10 }} src="https://unsplash.it/40/40" alt="" />
    );
    return (
      <div className={classes.root}>
       <div className={"main-conatiner"}>
        {settings.sidebar === true    ?
        <AppBar 
          position="absolute"
          className={classNames(classes.appBar)}
          title={img}
        >
          <Toolbar disableGutters={true}>
            <Tooltip title="">
              <IconButton color="inherit" aria-label="Menu" className={`${classes.homeIcon} home-btn`}>
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <Typography
                variant="title"
                color="inherit" 
                className={`${classNames(
                  classes.logoText,
                  !this.state.open && classes.hide
                )} logo`}
              >
               <img
            src={`${process.env.PUBLIC_URL}/image/${getCookie().company_image}`}
            alt=""
            height="37"
          />
              </Typography>
            </Tooltip>
            <div className="header-right-block">
              <Tooltip title={this.state.open ? "Close drawer" : "Open drawer"}>
                <IconButton
                  color="inherit"
                  aria-label="Toggle drawer"
                  onClick={this.handleDrawerOpen}
                  className="menu-bar menu-toggle-btn"
                >
                  <Menu />
                </IconButton>
              </Tooltip>
              <b className="company-name">{user && user.company ? user.company : '' }</b> 
              <Tooltip title="">
                <Button className={`${classes.navButton} m-d-none`}></Button>
              </Tooltip>
              <Tooltip title="" className="m-d-none">
                <Button className={`${classes.navButton} m-d-none`}></Button>
              </Tooltip>
              <Tooltip title="" className="setting-btn">
                <Button className={classes.navButton}></Button>
              </Tooltip>
              <MenuAppBar className="nav-bar" socket={settings.socket} user={user !== null  ? user : {}} />
            </div>
          </Toolbar>
        </AppBar>  : null  }
        {settings.sidebar   ?
        <Drawer className="left-menu-panel"
          variant="permanent" 
          classes={{
            paper: classNames(
              'main-sidebar ' +
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose, 
              this.state.open ? 'is-open' : ''
            )
          }}
          open={this.state.open}
        >
          <div className={classes.brand}>
            Queen of Raw
            <IconButton
              onClick={this.handleDrawerClose}
              className={classes.menuItem}
            >
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.list}>
            <div>
              <ListItem
              onClick={this.handleResponsiveDrawer}
                component={Link}
                to="/dashboard"
                button
                className={classNames(
                  classes.listItem,
                  this.isActive("/dashboard") && "active"
                )}
              >
                <ListItemIcon className={classes.menuItemIconDeselect && "icon-block"}>
                  <FontAwesomeIcon icon={faTachometerAlt} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  className={classes.menuItem}
                  primary={
                    <Typography
                      className={classNames(
                        classes.menuItem,
                        !this.state.open && classes.hide
                      )}
                    >
                      Dashboard
                    </Typography>
                  }
                />
              </ListItem>

            </div>
          </List>
        </Drawer> : null } 
         
        <main className={'main-content-area-inner ' + classes.content}>
          <div className={classes.switch}>{this.props.children}</div>
        </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
