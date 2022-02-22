import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { getCookie } from "../../helpers/utility";


const mapDispatchToProps = ({ dashboard }) => {
  return {
    ...dashboard
  };
};

const mapStateToProps = ({ dashboard }) => {
  return {
    ...dashboard
  };
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  container: {
    margin: "20px auto",
    width: "800px"
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
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  graphHeader: {
    paddingBottom: '10px', // 16:9
  }
})
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  render() {
    const { classes } = this.props;
    return (
      <main className={'test ' + classes.root}>
        <h5 style={{ paddingTop: "15%", paddingLeft: "33%" }}>User: <b style={{ color: "red" }}>{getCookie() ? getCookie().username : null}</b> is logged in.</h5>
      </main>
    );
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles, { withTheme: true }))(Dashboard);
