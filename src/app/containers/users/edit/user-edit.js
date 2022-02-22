import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Form from "./form";
import Loader from "../../../components/loader";
import { withStyles } from "@material-ui/core/styles";
import { history } from "../../../store";
import { Paper,Button,Table,TableBody,TableCell,TableHead,TableRow} from "@material-ui/core";
import EditPermissionsModal from "./editPermissions";
import DeleteIcon from '@material-ui/icons/Delete';

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
    cursor: "pointer",

  }
}))(TableCell);

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
  row: {
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.background.default
    }
  },
  userName: {
    color: "black",
    fontSize: "x-large",
    fontWeight: 800
  },
  floatRight:{
    float: "right"
  }
});

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {id:"",showEditModal:false};
  }
  async componentDidMount() {
    const {match} = this.props;
    const id = match.params.id;
    this.setState({id:id});
    await this.props.getUser({id,loader:true});
    this.props.getRoles();
    this.props.vendorCompanies()
  }
  async handleSubmit(data) {
    data.id = this.props.user.id;  
    data.app = this.props.user.app_id;
    await this.props.updateUser(data);
    history.push('/users');
  }
  async handleClickOpen(){
    this.setState({showEditModal:true})
  }
  closeEditModal(){
    this.setState({showEditModal:false})
  }
  async updatePermissions(data){
    this.setState({showEditModal:false})
    data.user_id = this.state.id;
    console.log(data)
    await this.props.updatePermissions(data)
    await this.props.getUser({id:this.state.id,loader:false});
  }
  async deleteRole(item){
    let data = {id:item.id,role_id:item.role_id,user_id:item.user_id}
    console.log(data)
    await this.props.deleteVendorPermissions(data)
    await this.props.getUser({id:this.state.id,loader:false});
  }

  render() {
    const { classes,loading } = this.props;
    if (loading) return <Loader />;
    return (
      <main className="main-inner-wrapper">
        <div class="inner-main-head">
          <div class="title">
            Edit User : <span>{this.props.user.fname}</span>
          </div>
         
        </div>
        <Paper className={classes.paperRoot} elevation={1} class="inner-main-container">
          <div class="box box-default mb-4">
            <div class="box-body">
               <Form  user={this.props.user} onSubmit={this.handleSubmit.bind(this)} />

               {this.props.user && this.props.user.vendorChain && this.props.user.vendorChain.length ?
                <div className="table-wrapper">
                    <Table className="table-w-large">
                      <TableHead style={{ lineHeight: "100%" }}>
                        <TableRow>
                          <CustomTableCell padding="dense" style={{ backgroundColor:"white" }}>Companies</CustomTableCell>
                          <CustomTableCell padding="dense" style={{ backgroundColor:"white" }}>Role</CustomTableCell>
                          <CustomTableCell padding="dense" style={{ backgroundColor:"white" }}>Status</CustomTableCell>
                          <CustomTableCell padding="dense" style={{ backgroundColor:"white" }}></CustomTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {this.props.user.vendorChain.map((row, i) => {
                          return (
                            <TableRow className={classes.row} key={i}>
                              <CustomTableCell component="td" scope="row"> {row.company.vendor_name}</CustomTableCell>
                              <CustomTableCell component="td" scope="row"> {row.mmx_role.role_id}</CustomTableCell>
                              <CustomTableCell component="td" scope="row"> {row.status}</CustomTableCell>
                              <CustomTableCell component="td" scope="row">  <DeleteIcon onClick={this.deleteRole.bind(this,row)} /></CustomTableCell>
                            </TableRow>
                          )
                      })}
                      </TableBody>
                    </Table>
                  </div> : null }

                <div class="col-sm-12 edit-btn-block">
                  <span><Button color="primary" variant="contained" size="small" onClick={this.handleClickOpen.bind(this)} className="search-btn" component="span">Edit Vendor Chain Premissions</Button></span>
                </div>
            </div>
          </div>
        
        </Paper>
          {this.state.showEditModal ?  <EditPermissionsModal user={this.props.user} updatePermissions={this.updatePermissions.bind(this)} roles={this.props.roles} vendorCompanies={this.props.vendorCompany}   closeModal={this.closeEditModal.bind(this)} /> : null }
              
      </main>
    );
  }
}

export default compose(withStyles(styles),connect(mapStateToProps, mapDispatchToProps))(EditUser);
