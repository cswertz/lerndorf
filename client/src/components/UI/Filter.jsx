import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import RoomIcon from '@material-ui/icons/Room';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.2rem',
  },
  actionsItem: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 4,
    color: theme.palette.grey[500],
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,

    '&:not(:last-child)': {
      marginRight: '0.2rem',
    },

    '&:hover': {
      background: theme.palette.grey[200],
    },

    '&:active': {
      background: theme.palette.grey[300],
    },

    '& svg': {
      height: 22,
      width: 22,
    },
  },
}));

const Filter = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Typography variant="body2">Sort by</Typography>

      <div className={classes.actions}>
        <div className={classes.actionsItem}>
          <SortByAlphaIcon />
        </div>
        <div className={classes.actionsItem}>
          <AccountTreeIcon />
        </div>
        <div className={classes.actionsItem}>
          <RoomIcon />
        </div>
        <div className={classes.actionsItem}>
          <ExploreIcon />
        </div>
      </div>
    </div>
  );
};

export default Filter;
