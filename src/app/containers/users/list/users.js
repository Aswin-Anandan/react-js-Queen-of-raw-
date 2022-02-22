import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Loader from "../../../components/loader";
import Button from "@material-ui/core/Button";
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
    flexGrow: 1,
    height:'100vh',    
  },
  container:{
    backgroundColor : '#fff',
  },
  table: {
    minWidth: 1020,
    cursor:"pointer"
  },
  tableWrapper: {
    overflowX: 'auto',
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
  addButton:{
    backgroundColor: "#11bdd5",
    '&:hover': {
      backgroundColor: "#11bdd5",
    },
  }
});



class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterCheck: false,
    };
  }

  async componentDidMount() {
    this.props.getUsers();
  }


  masterCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  getCompanies(companies){
    let result = '';
    let companiesArray = []
    if(companies && companies.length){
      companies.forEach(item => {
          if(item && item.company)
            companiesArray.push(item.company.vendor_name)

      })
      result = companiesArray.join(', ');
    }

    return result;
  }

  render() {
    const { classes } = this.props;
    // if (loading) return <Loader />;
    const style = { cursor: "pointer" };

let user = this.props.users ? this.props.users : ""
    return (
      <main className={classes.root}>
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
          <div className={classes.pageHeader} class="title">Users</div>
           <Button variant="contained" color="primary" component={Link} to={`/user/create`} className={classes.addButton} class="add-btn">ADD USER</Button>
        </div>

      <div className={classes.container} class="inner-main-container">
        <Paper className={classes.paperroot} elevation={1}>
        {this.props.loading && this.props.users.length === 0
        ?
          <Loader />
        :
          this.props.users? 
            <div class="table-wrapper">
              <Table className="table-w-large"> 
                <TableHead>
                  <TableRow>
                    <TableCell padding="dense">Name</TableCell>
                    <TableCell padding="dense">Account</TableCell>
                    <TableCell padding="dense">Company(s)</TableCell>
                    <TableCell padding="dense">Last Accessed</TableCell>
                    <TableCell padding="dense">Active</TableCell>
                    <TableCell padding="dense">Edit</TableCell>

                  </TableRow>
                </TableHead>
                 <TableBody>
                  {user ? user.map(item => {
                    return (
                      <Fragment>
                      {item.email  ? 
                      <TableRow key={item.id }>
                      
                        <TableCell
                          padding="dense"
                          style={style}
                          component="td"
                          scope="row"
                          // onClick={this.routeChangeDetails.bind(this, item._id)}
                        >
                          {item ? item.username : null}
                        </TableCell>
                        <TableCell
                          padding="dense"
                          component="td"
                          scope="row"
                          style={style}
                          // onClick={this.routeChangeDetails.bind(this, item._id)}
                        >
                          {item && item.account_names ? item.account_names.name : null }
                        </TableCell>
                        <TableCell
                          padding="dense"
                          component="td"
                          scope="row"
                          style={style}
                        >
                          {this.getCompanies(item.companies) }
                        </TableCell>
                      
                        <TableCell
                          padding="dense"
                          component="td"
                          scope="row"
                          style={style}
                          // onClick={this.routeChangeDetails.bind(this, item._id)}
                        >
                          {item && item.last_login ? new Date(item.last_login).toDateString() : null }
                        </TableCell>

                        <TableCell
                          padding="dense"
                          component="td"
                          scope="row"
                          style={style}
                          // onClick={this.routeChangeDetails.bind(this, item._id)}
                        >
                          {item.active}
                        </TableCell>

                        <TableCell
                          padding="dense"
                          component="td"
                          scope="row"
                          style={style}
                          // onClick={this.routeChangeDetails.bind(this, item._id)}
                        >
                          <Link to={`/user/edit/${item.id}`} class="edit-btn">Edit User</Link>
                        </TableCell>
                      </TableRow> : null } </Fragment>
                    );
                  }) : null}
                </TableBody> 
              </Table>
            </div>
            : <p style={{ textAlign: "center" }}>No data found</p>}
          </Paper>
        </div>
      </main>
    );
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles, { withTheme: true })
)(Users);
