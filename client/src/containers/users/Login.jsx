import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import LoginForm from '@components/users/LoginForm';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flexBasis: '50%',
      paddingLeft: theme.spacing(32),
      paddingRight: theme.spacing(32),
    },
  },
  mobileImageContainer: {
    borderRadius: 9,
    overflow: 'hidden',

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  desktopImageContainer: {
    display: 'none',
    flexBasis: '50%',

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  image: {
    display: 'block',
    width: '100%',

    [theme.breakpoints.up('lg')]: {
      // height: '100%',
      height: '100vh',
      objectFit: 'cover',
    },
  },
  textField: {
    flex: 1,
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  formControl: {
    margin: theme.spacing(),
    flex: 1,
    minWidth: 120,
    textAlign: 'left',
  },
}));

const Login = ({ handleSubmit, history, errors }) => {
  const classes = useStyles();

  function onSubmit(event) {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };

    handleSubmit(data, history);
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.desktopImageContainer}>
        {/* <picture></picture> */}
        <img className={classes.image} src="https://via.placeholder.com/746x900" alt="Lerndorf" />
      </div>

      <div className={classes.content}>
        <div className={classes.mobileImageContainer}>
          {/* <picture></picture> */}
          <img className={classes.image} src="https://via.placeholder.com/320x180" alt="Lerndorf" />
        </div>

        <Typography variant="subtitle">Willkommen zurück!</Typography>
        <Typography variant="h3">Loggen Sie sich ein.</Typography>
        <LoginForm errors={errors.login} handleSubmit={onSubmit} />

        <div>Noch keinen Account?</div>
        <Link to="/users/register">Hier geht&apos;s zur Registrierung</Link>

        <div>Datenschutz - Nutzungsbedingungen - Impressum</div>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginWithRouter = withRouter(Login);

export default LoginWithRouter;
