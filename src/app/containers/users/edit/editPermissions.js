import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select } from "@material-ui/core";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";


const styles = theme => ({
  root: {
    // width: 500
  }
});

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
    cursor: "pointer",

  }
}))(TableCell);

class DetailsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true

    };
  }
  componentDidMount() {
    if (this.props.roles && this.props.roles.length)
      this.setState({ role_id: this.props.roles[0].id })
    if (this.props.user && this.props.user.companies && this.props.user.companies.length)
      this.setState({ company: this.props.user.companies[0].vendor_id })
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeModal()
  };
  submit() {
    this.props.handleCheckChange(this.props.item)
    this.setState({ open: false });
    this.props.closeModal()
  }
  handleChanges = event => {
    this.setState(
      { [event.target.name]: event.target.value }
    );
  };


  save() {
    let data = { ...this.state }
    delete data.open
    this.setState({ open: false });
    this.props.updatePermissions(data)
  }

  render() {
    const { classes } = this.props;
    console.log(this.props)
    return (
      <div>
        <Dialog className="modal-wrapper"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={`${classes.root} modal-content`} >
            <DialogTitle id="form-dialog-title">EDIT VENDOR CHAIN PERMISSIONS</DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>

              <div class="row">
                <div className='col-sm-4'> Select Role to Add </div>
                <div className="col-sm-8">
                  {this.props.roles && this.props.roles.length ?
                    <Select
                      value={this.state.role_id}
                      onChange={this.handleChanges.bind(this)}
                      name="role_id"
                    >
                      {this.props.roles.map((code, i) => (
                        <MenuItem
                          value={code.id}
                          key={i}
                        >
                          {code.role_id}
                        </MenuItem>
                      ))}
                    </Select> : null}
                </div>
              </div>
              <div class="row">
                <div className='col-sm-4'> Select Company </div>
                <div className="col-sm-8">
                  {this.props.vendorCompanies && this.props.vendorCompanies.length ?
                    <Select
                      value={this.state.company}
                      onChange={this.handleChanges.bind(this)}
                      name="company"
                    >
                      {this.props.vendorCompanies.map((code, i) => (
                        <MenuItem
                          value={code.vendor_id}
                          key={i}
                        >
                          {code.vendor_name}
                        </MenuItem>
                      ))}

                    </Select> : null}
                </div>
              </div>
              {this.props.user && this.props.user.vendorChain && this.props.user.vendorChain.length ?
                <div className="table-wrapper">
                  <Table className="table-w-large">
                    <TableBody>
                      {this.props.user.companies.map((vendor, i) =>
                        <div>
                          <TableRow className={classes.row}>
                            <div className="name" style={{ paddingTop: "3em", fontWeight: "bold" }}>
                              <p>{this.props.user.fname} {this.props.user.lname} Roles for {vendor.vendor_name}</p>
                            </div>
                          </TableRow>
                          {this.props.user.vendorChain.map((row, i) =>
                            row.company.vendor_id === vendor.vendor_id ? <TableRow className={classes.row} key={i}>
                              <CustomTableCell component="td" scope="row" style={{ padding: 0 }}> {row.mmx_role.role_id}</CustomTableCell>
                              <CustomTableCell component="td" scope="row" style={{ padding: 0 }}> {row.status} </CustomTableCell>
                            </TableRow> : null
                          )}
                        </div>
                      )}
                    </TableBody>
                  </Table>
                </div> : null}

            </DialogContent>
            <div className="footer-block">
              <div className="item">
                <Button
                  className="btn primary-btn"
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={this.save.bind(this)}
                >
                  SAVE
                </Button>
                <Button
                  className="btn secondary-btn"
                  color="primary"
                  onClick={this.handleClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailsModal);