import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  previousIcon: {
    transform: 'rotate(180deg)',
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        color="secondary"
        variant="contained"
        startIcon={<ArrowRightAltIcon className={classes.previousIcon} />}
        component={Link}
        to="/content/2-1"
      >
        previous Content
      </Button>

      <Button
        color="secondary"
        variant="contained"
        endIcon={<ArrowRightAltIcon />}
        component={Link}
        to="/content/2-3"
      >
        next Content
      </Button>
    </div>
  );
};

export default NavigationBar;
