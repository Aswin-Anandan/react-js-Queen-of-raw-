import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
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

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'company', numeric: false, disablePadding: true, label: 'Company' },
  { id: 'role', numeric: false, disablePadding: true, label: 'Role' },
  { id: 'lastActive', numeric: false, disablePadding: true, label: 'Last Accessed' },
  { id: 'active', numeric: false, disablePadding: true, label: 'Active' },
  { id: 'edit', numeric: false, disablePadding: true, label: 'Edit' },
];

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
          
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor : '#E3E4E5',
    height:'100vh',    
  },
  container:{
    marginLeft:50,
    marginTop:50,
    marginRight:30,
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
    position: "absolute",
    right: "0px",
    marginTop: "-30px",
  }

});

class ApiAccounts extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.users.map(n => n.app_id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, app_id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(app_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, app_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = app_id => this.state.selected.indexOf(app_id) !== -1;

  async componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const { classes,users } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
 
    return (
      <Paper className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="body2" color="inherit">
              <span className={classes.breadCrumb}><Link to={`/dashboard`}>Home</Link></span> / API Accounts
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.headers}>
          <div className={classes.pageHeader}>Users</div>
           <Button variant="contained" color="primary" component={Link} to={`/user/create`} className={classes.addButton}>ADD USER</Button>
        </div>
        <div className={classes.container}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <div>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {stableSort(users, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.app_id);
                    return (
                      <TableRow
                        key={n.mmx_user.id}
                        hover
                        onClick={event => this.handleClick(event, n.app_id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                        <Checkbox
                         checked={isSelected} 
                         />
                        </TableCell>
                        <TableCell component="td" scope="row" padding="none">{n.mmx_user.username}</TableCell>
                        <TableCell component="td" scope="row" padding="none">{n.mmx_user.company}</TableCell>
                        <TableCell component="td" scope="row" padding="none">{n.mmx_user.mmx_role.role_type}</TableCell>
                        <TableCell component="td" scope="row" padding="none">{new Date(n.mmx_user.updatedAt).toDateString()}</TableCell>
                        <TableCell component="td" scope="row" padding="none">{n.mmx_user.active}</TableCell>
                        <TableCell component="td" scope="row" padding="none"><Link to={`/user/edit/${n.mmx_user.id}`}><u>edit user ></u></Link></TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    );
  }
}

ApiAccounts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(connect(mapStateToProps,mapDispatchToProps),withStyles(styles, { withTheme: true }))(ApiAccounts);
