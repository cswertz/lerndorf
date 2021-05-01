import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

const BinaryDialog = ({ onClose, onConfirm, title, text, open }) => (
  <Dialog onClose={onClose} open={open}>
    <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{text}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onConfirm} color="primary">
        Yes
      </Button>
      <Button onClick={onClose} color="primary" autoFocus>
        No
      </Button>
    </DialogActions>
  </Dialog>
);

BinaryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default BinaryDialog;
