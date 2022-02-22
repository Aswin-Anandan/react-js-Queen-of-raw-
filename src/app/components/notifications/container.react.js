import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import eventEmitter from "./event-emitter";

class SimpleSnackbar extends React.Component {
  state = {
    open: false
  };
  componentDidMount() {
    eventEmitter.on("notification", this.handleClick);
  }

  componentWillUnmount() {
    eventEmitter.removeListener("notification", this.handleClick);
  }

  handleClick = message => {
    this.setState({ open: true, message });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { message } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
          <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

export default SimpleSnackbar;
