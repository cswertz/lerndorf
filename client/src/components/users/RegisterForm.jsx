import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  flex: {
    display: 'flex',
  },
  pictureButton: {
    width: '100%',
    marginTop: 25,
  },
});

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
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

  return (
    <TextField
      helperText={helperText}
      error={(touched && error) || errorText}
      label={label}
      {...input}
      {...customOptions}
    />
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'username',
    'email',
    'password',
    'password1',
  ];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.password && values.password1 && (values.password !== values.password1)) {
    errors.password = 'Passwords do not match';
    errors.password1 = 'Passwords do not match';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const Register = ({
  handleSubmit,
  submitting,
  pristine,
  classes,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <Field
        required
        name="username"
        label="Username"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errors.username}
      />
      <Field
        required
        name="email"
        label="E-Mail"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errors.email}
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
      />
      <Field
        required
        type="password"
        name="password1"
        label="Repeat Password"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div className={classes.flex}>
      <Field
        name="titlePrefix"
        label="Title Prefix"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="firstName"
        label="First name"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="lastName"
        label="Last Name"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="titleSuffix"
        label="Title Suffix"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div className={classes.flex}>
      <Field
        type="date"
        name="birthdate"
        label="Birthdate"
        component={renderTextField}
        className={classes.textField}
        InputLabelProps={{ shrink: true }}
      />
      <Field
        name="studyId"
        label="Study ID"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="phone"
        label="Phone"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div className={classes.flex}>
      <Field
        name="street"
        label="Address"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="zip"
        label="Zip"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="city"
        label="City"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="country"
        label="Country"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div className={classes.flex}>
      <Field
        name="website"
        label="Website"
        component={renderTextField}
        className={classes.textField}
      />
      <label
        id="picture-label"
        htmlFor="picture"
        nesting="asdfasdf"
        className={classes.textField}
      >
        <Button
          variant="raised"
          component="span"
          className={classes.pictureButton}
        >
          Upload Profile picture
        </Button>
      </label>
      <input
        accept="image/*"
        className={classes.input}
        style={{ display: 'none' }}
        name="picture"
        id="picture"
        type="file"
      />
    </div>
    <div className={classes.flex}>
      <Field
        cols={120}
        rows={4}
        multiline
        rowsMax={4}
        name="description"
        label="Description"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div>
      <Button
        type="submit"
        variant="contained"
        disabled={pristine || submitting}
      >
        Register
      </Button>
    </div>
  </form>
);


Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const RegisterForm = reduxForm({
  form: 'Register',
  validate,
})(Register);

export default withStyles(styles)(RegisterForm);
