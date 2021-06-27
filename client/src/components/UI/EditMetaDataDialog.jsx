import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Card from '@components/UI/Card';
import DataEdit from '@components/UI/icons/DataEdit';
import NoteEdit from '@components/UI/icons/NoteEdit';
import UnitEdit from '@components/UI/icons/UnitEdit';
import CourseEdit from '@components/UI/icons/CourseEdit';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {},
  },
  title: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: theme.spacing(2),
    padding: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
    },
  },
}));

const DialogTitle = ({ children, onClose, ...other }) => {
  const classes = useStyles();

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>

      {onClose && (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
};

const EditMetaDataDialog = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.wrapper}
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={false}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        Edit Metadata
      </DialogTitle>

      <DialogContent className={classes.content} dividers>
        {/* TODO: add onClick handlers */}
        <Card icon={<DataEdit />} title="Edit Metadata" />
        <Card icon={<NoteEdit />} title="Edit Knowledge Unit Metadata" />
        <Card icon={<UnitEdit />} title="Edit Learning Unit Metadata" />
        <Card icon={<CourseEdit />} title="Edit Course Metadata" />
      </DialogContent>
    </Dialog>
  );
};

export default EditMetaDataDialog;
