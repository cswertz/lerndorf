import React, { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '../../../node_modules/@material-ui/core/index';

export default function DeleteCourse(props) {
  const { actions, course, onConfirm, okBtnText, history, fetch } = props;

  const [open, setOpen] = React.useState(false);
  const [headline, setHeadline] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [mode, setMode] = React.useState('confirm');
  const [okBtn, setOkBtn] = React.useState('OK');
  const [cancelBtn, setCancelBtn] = React.useState('Cancel');

  const handleDeleteRequest = () => {
    setMode('confirm');
    setOpen(true);
    setMessage(
      'Warning. This operation cannot be undone. Do you really want to delete the course?',
    );
  };

  const handleDeleteResponse = (text) => {
    setMode('alert');
    setOpen(true);
    setMessage(text);
    if (fetch) {
      fetch();
    }
  };

  const handleClose = (confirmResult) => {
    if (mode === 'confirm' && confirmResult === true) {
      // Trigger the delete, cause it is confirmed.
      actions.courseDelete(course.id).then((result) => {
        setOpen(false);
        if (result.message) {
          setTimeout(() => handleDeleteResponse(result.message), 100);
        }
      });
    } else if (mode === 'confirm' && confirmResult === false) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (okBtnText) {
      setOkBtn(okBtnText);
    }
  }, [okBtnText]);

  return (
    <>
      <IconButton aria-label="Delete course" onClick={handleDeleteRequest}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{headline}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ minWidth: '200px' }}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {mode === 'confirm' && (
            <Button
              onClick={() => {
                handleClose(false);
              }}
              color="primary"
              autoFocus
            >
              {cancelBtn}
            </Button>
          )}
          <Button
            onClick={() => {
              handleClose(true);
            }}
            color="primary"
            autoFocus
          >
            {okBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
