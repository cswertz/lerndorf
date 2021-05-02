import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  textField: {
    flex: 1,
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
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

  let helperText = label;
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
      helperText={helperText}
      error={hasError}
      label={label}
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
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Login = ({ handleSubmit, submitting, pristine, classes, errors }) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <Field
        required
        name="username"
        label="Username"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errorMessage}
      />
    </div>
    <div className={classes.flex}>
      <Field
        required
        type="password"
        name="password"
        label="Password"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errorMessage}
      />
    </div>
    <div>
      <Button type="submit" variant="contained" disabled={pristine || submitting}>
        Login
      </Button>
    </div>
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
