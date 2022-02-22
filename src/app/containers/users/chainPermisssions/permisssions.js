import React,{ Component } from 'react';
import { connect } from "react-redux";
import { compose } from "recompose";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';

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

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paperroot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
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
    position: "absolute",
    right: "0px",
    marginTop: "-30px",
  },
  breadCrumb: {
    cursor: 'pointer',
    color: theme.palette.primary[400]
  },
});

class ChainPermisssions extends Component {
  constructor(props) {
    super(props);
    this.state = { vendor: '',selected: []};
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.getProducts(event.target.value);
  }
  
  handleClick(x) {
    this.setState(state => ({
      selected: state.selected.includes(x) ?
        state.selected.filter(c => c !== x) :
        [...state.selected, x]
    }));
  }
  componentDidMount(){
    this.props.getVendors();
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.root}>
         <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="body2" color="inherit">
                <span className={classes.breadCrumb}><Link to={`/dashboard`}>Home</Link></span> / API Accounts
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.headers}  class="inner-main-head">
              <div class="title">Edit User Product Chain Permissions</div>
            </div>
          <div class="inner-main-container">           
          <Paper className={classes.paperroot} elevation={1}>   
          <div class="row">
            <div class="col-sm-12 col-md-6 col-lg-3">
              <FormControl className={classes.formControl} class="search-suply-chain">
                <Select
                    value={this.state.vendor}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'vendor',
                      id: 'vendor',
                    }}
                  >
                  <em>Select Vendor</em>
                  {this.props.vendors.map(vendor => {
                    return (
                      <MenuItem key={vendor.vendor_id} value={vendor.vendor_id}>{vendor.vendor_name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
            <div class="table-wrapper">
              <Table className="table">
                 <TableHead>
                  <TableRow>
                    <CustomTableCell >Active</CustomTableCell>
                    <CustomTableCell>Products</CustomTableCell>
                    <CustomTableCell >SKU</CustomTableCell>
                    <CustomTableCell>Permissions</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.products.map(row => {
                    return (
                      <TableRow className={classes.row} key={row.entity_id}>
                        <CustomTableCell component="td" scope="row">
                          {row.entity_id}
                        </CustomTableCell>
                        <CustomTableCell component="td">{row.name}</CustomTableCell>
                        <CustomTableCell component="td">{row.sku}</CustomTableCell>
                        <CustomTableCell component="td">
                        <FormControlLabel
                            control = {
                              <Checkbox
                                key={`edit-${row.entity_id}`}
                                onClick={() => this.handleClick(`edit-${row.entity_id}`)}
                                checked={this.state.selected.includes(`edit-${row.entity_id}`)}
                              />
                              }
                          label = "Edit" />
                        <FormControlLabel
                        control = {
                        <Checkbox
                          key={`browse-${row.entity_id}`}
                          onClick={() => this.handleClick(`browse-${row.entity_id}`)}
                          checked={this.state.selected.includes(`browse-${row.entity_id}`)}
                        />
                        }
                        label = "Browse"/>
                        <FormControlLabel
                        control = {
                        <Checkbox
                          key={`editnbrowse-${row.entity_id}`}
                          onClick={() => this.handleClick(`editnbrowse-${row.entity_id}`)}
                          checked={this.state.selected.includes(`editnbrowse-${row.entity_id}`)}
                        />
                        }
                        label = "Edit & Browse"/>
                      
                  </CustomTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
            </Table>
            </div>
           

        </Paper>
          
          </div>
         
      </main>
     
      );
    }
}
ChainPermisssions.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(ChainPermisssions);
