import React, { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '../../../node_modules/@material-ui/core/index';
import { PlayArrow } from '../../../node_modules/@material-ui/icons/index';

export default function EnroleToCourse(props) {
  const { actions, course, onConfirm, okBtnText, history } = props;

  const [open, setOpen] = React.useState(false);
  const [headline, setHeadline] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [okBtn, setOkBtn] = React.useState('OK');

  const handleEnrolementRequest = () => {
    actions.courseEnroleTo(course.id, history).then((res) => {
      if (res.error) {
        setMessage(res.error);
        setHasError(true);
        setOpen(true);
        return;
      }
      if (res.err?.errors) {
        setMessage(res.err.errors[0].message);
        setHasError(true);
        setOpen(true);
        return;
      }
      setHasError(false);
      setMessage(
        'You send the enrolement request. If it is automatic enroleable you will be activated immediately',
      );
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
    if (hasError === false) {
      history.push(`/courses/${course.id}`);
    }
  };

  useEffect(() => {
    if (okBtnText) {
      setOkBtn(okBtnText);
    }
  }, [okBtnText]);

  return (
    <>
      <IconButton aria-label="Enrole to course" onClick={handleEnrolementRequest}>
        <PlayArrow />
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
