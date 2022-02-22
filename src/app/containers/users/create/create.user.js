import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Form from "./form";
import Loader from "../../../components/loader";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import { history } from "../../../store";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
const mapDispatchToProps = ({ users }) => {
  return {
    ...users
  };
};

const mapStateToProps = ({ users }) => {
  return {
    ...users
  };
};

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 300
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '40px'
  },
  headers:{
    margin: "50px",
    position: "relative"
  },
  pageHeader:{
    color: "#1f95f4",
    fontSize: "x-large",
    fontWeight: 800
  },
  appBar: {
    height: 55,
    paddingTop:3,
    boxShadow: 'none',
    backgroundColor: '#fff',
    color:'#616468',
    border:'1px solid #c0c1c1',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
  },
  breadCrumb:{
    cursor:'pointer',
    color:theme.palette.primary[400]
  }
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.init()
  }
  async init(){
    await this.props.getVendors();
  }
  async handleSubmit(data) {
    await this.props.createUser(data);
    history.push('/users')
  }

  render() {
    const { classes,loading } = this.props;
    if (loading) return <Loader />;
    return (
      
      <main class="main-section">
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="body2" color="inherit">
              <span className={classes.breadCrumb}>
                <Link to={`/dashboard`}>Home</Link>
              </span>{" "}
              / API Accounts
            </Typography>
          </Toolbar>
        </AppBar>
         <div className={classes.headers} class="inner-main-head">
            <div className={classes.pageHeader} class="title">Add New Users</div>
        </div>
        <div className="main-inner-wrapper">
          <Paper className={classes.paperRoot} elevation={1} class="inner-main-container">
            <div class="box box-default mb-4">
              <div class="box-body">
                 <Form  onSubmit={this.handleSubmit.bind(this)} vendors={this.props.vendors} />
              </div>
            </div>
          </Paper>
        </div>
      </main>
    );
  }
}

export default compose(withStyles(styles),connect(mapStateToProps, mapDispatchToProps))(Create);
