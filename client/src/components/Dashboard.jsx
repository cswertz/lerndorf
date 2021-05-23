// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  imageContainer: {
    borderRadius: 9,
    marginBottom: theme.spacing(3),
    overflow: 'hidden',

    [theme.breakpoints.up('lg')]: {
      maxHeight: 230,
      marginBottom: theme.spacing(6),
    },
  },
  image: {
    objectFit: 'cover',
    width: '100%',
  },
  text: {
    padding: theme.spacing(2, 0),
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
        marginRight: theme.spacing(6),
      },
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.imageContainer}>
        {/* <picture></picture> */}
        <img className={classes.image} src="https://via.placeholder.com/320x180" alt="Lerndorf" />
      </div>

      <Typography variant="h3">Welcome to Lerndorf!</Typography>

      <Typography className={classes.text} variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. A eros pretium, risus, in et,
        congue. Eget dolor id fames et. Nunc nunc lectus etiam ante. Morbi aliquam congue tincidunt
        ornare ut in risus dictum etiam. Nulla consectetur ornare faucibus semper faucibus cursus.
        Adipiscing rhoncus quis sit non est dolor at a, ut. Tincidunt amet ullamcorper semper nulla
        nisi eget imperdiet sit aliquet.
      </Typography>

      <Button
        // color="grey"
        variant="contained"
        endIcon={<ArrowRightAltIcon />}
        component={Link}
        to={{
          pathname: '/learning-units/',
        }}
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
          to="/learning-units"
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
          to="/learning-units"
        />

        <Card
          icon={<ChatBubbleOutlineIcon />}
          count={2}
          title="Nachrichten"
          component={Link}
          to="/learning-units"
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
