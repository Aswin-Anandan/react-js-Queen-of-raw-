import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, DialogTitle,TextField } from "@material-ui/core";

const styles = theme => ({
  root: {
    // width: 500
  }
});

class CreateMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      messageText:''
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.closeModal()
  };
  handleBack = () => {
    this.setState({ open: false });
    this.props.backModal()
  };
  handleReply = () => {
    if(this.state.messageText && this.state.messageText.length){
      this.setState({ open: false });
      this.setState({ messageText: '' });
      this.props.addMeassge({message_subject:this.state.messageText,message_detail:this.state.messageText})
    }
  }
  handleOnChange = event => {
    this.setState({messageText:event.target.value})
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog className="modal-wrapper"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={`${classes.root} modal-content`} >
            <DialogTitle id="form-dialog-title">Create Message</DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>
            
                <div><b>Type your message below and  then "send"</b></div>
               <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  label="Type Message"
                  defaultValue={""}
                  className={classes.textField}
                  value={this.state.messageText}
                  multiline
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleOnChange}
                />
              </form>
            </DialogContent>
            <div className="footer-block">
              <div className="item">
                <Button variant="outlined" className="btn secondary-btn" color="primary" onClick={this.handleClose}>  CLOSE </Button>
                {this.props.showBack ? <Button variant="outlined" className="btn secondary-btn" color="primary" onClick={this.handleBack}>  BACK </Button> : null}
                <Button variant="outlined" className="btn secondary-btn" color="primary" onClick={this.handleReply}>  SEND </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CreateMessage);