import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faStar } from '@fortawesome/free-regular-svg-icons'
import { faEnvelopeOpenText, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { compose } from "recompose";
import { getCookie } from "../../helpers/utility";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  iconButton: {
    fontSize: 20,
    color: '#737F8C'
  },
  iconButtonImage: {
    borderRadius: 50,
    objectFit: 'cover'
  },
  badgeBell: {
    background: '#f25757',
    color: '#fff',
    fontWeight: '700',
    borderRadius: 90,
    width: 18,
    height: 18,
    padding: 2,
    lineHeight: 16,
    fontSize: 9,
  },
  badgeList: {
    background: '#FBC32D',
    color: '#fff',
    fontWeight: '700',
    borderRadius: 90,
    width: 18,
    height: 18,
    padding: 2,
    lineHeight: 16,
    fontSize: 9,
  },
  badgeEnvelope: {
    background: '#52badd',
    color: '#fff',
    fontWeight: '700',
    borderRadius: 90,
    width: 18,
    height: 18,
    padding: 2,
    lineHeight: 16,
    fontSize: 9,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const mapDispatchToProps = ({ login, users }) => {
  return {
    ...login,
    ...users
  };
};

const mapStateToProps = ({ login, users }) => {
  return {
    ...login,
    ...users
  };
};
class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    this.props.logout();
  }

  render() {
    const { classes, unReadFavourites } = this.props;
    return (
      <div className={classes.root} class="main-nav">
        <Toolbar className="navbar-block">
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Tooltip title="">
              <IconButton color="inherit" className={`${classes.iconButton} profile-menu`} aria-haspopup="true"   >
                <Badge classes={{ badge: classes.badgeBell }} badgeContent={unReadFavourites.count ? unReadFavourites.count : 0}>
                  <FontAwesomeIcon icon={faStar} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="inherit" className={`${classes.iconButton} profile-menu`} aria-haspopup="true"   >
                <Badge classes={{ badge: classes.badgeBell }} badgeContent={0}>
                  <FontAwesomeIcon icon={faCartPlus} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="inherit" className={classes.iconButton}>
                <Badge classes={{ badge: classes.badgeBell }} badgeContent={0}>
                  <FontAwesomeIcon icon={faBell} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <IconButton color="inherit" className={classes.iconButton} >
                <Badge classes={{ badge: classes.badgeEnvelope }} badgeContent={0}>
                  <FontAwesomeIcon icon={faEnvelopeOpenText} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="">
              <Button className="profile-menu" aria-haspopup="true">
                <img src={getCookie() && getCookie().profile_photo ? getCookie().profile_photo : "http://placekitten.com/25/25"} alt="Kitten" width="30" height="30" className={classes.iconButtonImage} />
                <div >{getCookie() ? getCookie().username : null}</div>
              </Button>
            </Tooltip>

            <Tooltip title="">
              <IconButton className="signout" color="inherit" onClick={this.logout.bind(this)}  >
                Sign out <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MenuAppBar);

