import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import Card from '@components/UI/Card';

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  title: {
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('lg')]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
    },
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'row',

      '& > *:not(:last-child)': {
        marginRight: theme.spacing(4),
      },
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.title} variant="h3">
        Welcome to Lerndorf, {user.user.username}!
      </Typography>

      <Button
        color="secondary"
        variant="contained"
        endIcon={<ArrowRightAltIcon />}
        component={Link}
        to="/learning-units/"
      >
        Browse Courses
      </Button>

      <Divider className={classes.divider} />

      <div className={classes.cards}>
        <Card
          icon={<SchoolOutlinedIcon />}
          count={2}
          title="Meine Kurse"
          component={Link}
          to="/courses/my"
        />

        <Card
          icon={<EventAvailableIcon />}
          count={2}
          title="Meine Aufgaben"
          component={Link}
          to="/learning-units"
        />

        <Card
          icon={<BookOutlinedIcon />}
          count={2}
          title="Meine Inhalte"
          component={Link}
          to="/content/1"
        />

        <Card
          icon={<ChatBubbleOutlineIcon />}
          count={4}
          title="Threads"
          component={Link}
          to="/threads"
        />
      </div>
    </div>
  );
};

export default Dashboard;
