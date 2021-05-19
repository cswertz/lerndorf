// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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

      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. A eros pretium, risus, in et,
        congue. Eget dolor id fames et. Nunc nunc lectus etiam ante. Morbi aliquam congue tincidunt
        ornare ut in risus dictum etiam. Nulla consectetur ornare faucibus semper faucibus cursus.
        Adipiscing rhoncus quis sit non est dolor at a, ut. Tincidunt amet ullamcorper semper nulla
        nisi eget imperdiet sit aliquet.
      </Typography>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
