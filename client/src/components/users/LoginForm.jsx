import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { colors } from '@theme';

const styles = (theme) => ({
  textField: {
    flex: 1,
    marginBottom: theme.spacing(),
  },
  flex: {
    display: 'flex',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  error: {
    color: colors.danger.main,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
});

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const { errorText } = custom;
  const customOptions = custom;
  delete customOptions.errorText;

  // let helperText = ' ';
  let helperText = '';
  if (errorText) {
    helperText = errorText;
  }
  if (touched && error) {
    helperText = error;
  }

  let hasError = touched && !!error;
  if (errorText) {
    hasError = true;
  }

  return (
    <TextField
      variant="outlined"
      helperText={helperText}
      error={hasError}
      label={label}
      fullWidth
      {...input}
      {...customOptions}
    />
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'password'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Darf nicht leer sein.';
    }
  });

  return errors;
};

const Login = ({ handleSubmit, submitting, pristine, classes, errors }) => {
  const [state, setState] = useState({
    // TODO: do something with this
    stayLoggedIn: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Field
          name="username"
          label="E-Mail"
          autoComplete="email"
          component={renderTextField}
          className={classes.textField}
        />
      </Grid>

      <Grid item xs={12}>
        <Field
          type="password"
          name="password"
          label="Passwort"
          margin="normal"
          autoComplete="new-password"
          component={renderTextField}
          className={classes.textField}
        />
      </Grid>

      <div className={classes.actions}>
        <FormControlLabel
          label={<Typography variant="body2">eingeloggt bleiben?</Typography>}
          control={
            <Checkbox
              name="stayLoggedIn"
              checked={state.stayLoggedIn}
              color="primary"
              onChange={handleChange}
            />
          }
        />

        <Link to="/reset-password">
          <Typography variant="body2" color="textSecondary">
            Passwort vergessen?
          </Typography>
        </Link>
      </div>

      {errors.errorMessage && (
        <Typography className={classes.error} variant="body2">
          {errors.errorMessage}
        </Typography>
      )}

      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        disabled={pristine || submitting}
      >
        Einloggen
      </Button>
    </form>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const LoginForm = reduxForm({
  form: 'Login',
  validate,
})(Login);

export default withStyles(styles)(LoginForm);
