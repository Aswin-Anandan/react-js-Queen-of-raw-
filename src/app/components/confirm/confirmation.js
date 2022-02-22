import React from 'react';
import { confirmable } from 'react-confirm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class Confirmation extends React.Component {

  render() {
    const { confirmation,show,proceed,dismiss} = this.props;
    return (
      <Dialog
          open={show}
          onClose={dismiss}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {confirmation}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={dismiss} color="primary">
              Disagree
            </Button>
            <Button onClick={proceed} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
export default confirmable(Confirmation);
