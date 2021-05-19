import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  textField: {
    flex: 1,
    marginBottom: theme.spacing(),
  },
  flex: {
    display: 'flex',
  },
});

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const { errorText } = custom;
  const customOptions = custom;
  delete customOptions.errorText;

  let helperText = ' ';
  // let helperText = '';
  if (errorText) {
    helperText = errorText;
  }
  if (touched && error) {
    helperText = error;
  }

  let hasError = touched && error;
  if (errorText) {
    hasError = true;
  }

  return (
    <TextField
      variant="outlined"
      helperText={helperText}
      error={hasError}
      label={label}
      // margin="normal"
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

  // const errors = requiredFields.filter((field) => !values[field]).map((field) => field);
};

const Login = ({ handleSubmit, submitting, pristine, classes, errors }) => (
  <form onSubmit={handleSubmit}>
    <Grid item xs={12}>
      <Field
        required
        name="username"
        label="E-Mail"
        autoComplete="email"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errorMessage}
      />
    </Grid>
    <Grid item xs={12}>
      <Field
        required
        type="password"
        name="password"
        label="Passwort"
        autoComplete="new-password"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errorMessage}
      />
    </Grid>

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
