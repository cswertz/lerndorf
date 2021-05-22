import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { colors } from '@theme';
import LoginForm from '@components/users/LoginForm';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      height: '100vh',
    },
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3),

    [theme.breakpoints.up('lg')]: {
      flexBasis: '50%',
      overflow: 'auto',
    },
  },
  content: {
    // height: '100%',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: 400,
    },
  },
  mobileImageContainer: {
    borderRadius: 9,
    overflow: 'hidden',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  desktopImage: {
    display: 'none',
    flexBasis: '50%',
    objectFit: 'cover',

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  image: {
    display: 'block',
    width: '100%',
  },
  form: {
    marginTop: theme.spacing(4),
  },
  register: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  footer: {
    color: colors.tertiary,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(18),
    textAlign: 'center',

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  footerLink: {
    color: colors.tertiary,
  },
  separator: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
}));

const Login = ({ handleSubmit, errors }) => {
  const history = useHistory();
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
      <img
        className={classes.desktopImage}
        src="https://via.placeholder.com/746x900"
        alt="Lerndorf"
      />

      <div className={classes.contentContainer}>
        <div className={classes.content}>
          <div className={classes.mobileImageContainer}>
            <img
              className={classes.image}
              src="https://via.placeholder.com/320x180"
              alt="Lerndorf"
            />
          </div>

          <Typography variant="subtitle1">Willkommen zurück!</Typography>
          <Typography variant="h4">Loggen Sie sich ein.</Typography>

          <div className={classes.form}>
            <LoginForm errors={errors.login} handleSubmit={onSubmit} />
          </div>

          <div className={classes.register}>
            <Typography variant="body1">Noch keinen Account?</Typography>
            <Link to="/users/register">
              <Typography variant="body1" color="textSecondary">
                Hier geht&apos;s zur Registrierung
              </Typography>
            </Link>
          </div>

          <div className={classes.footer}>
            <Link className={classes.footerLink} to="/login">
              <small>Datenschutz</small>
            </Link>
            <div className={classes.separator}>–</div>
            <Link className={classes.footerLink} to="/login">
              <small>Nutzungsbedingungen</small>
            </Link>
            <div className={classes.separator}>–</div>
            <Link className={classes.footerLink} to="/login">
              <small>Impressum</small>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

export default Login;
