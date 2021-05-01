import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { isValidEmail, isValidUrl } from '@utils/user';

const styles = (theme) => ({
  textField: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  flex: {
    display: 'flex',
  },
  label: {
    marginLeft: '0',
  },
  labelLink: {
    marginLeft: '0',
    marginRight: '0',
  },
  link: {
    alignSelf: 'center',
  },
  pictureButton: {
    width: '100%',
    marginTop: 25,
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

const renderCheckboxField = ({ input, label, ...custom }) => {
  const customOptions = custom;
  const customInput = input;
  delete customInput.value;
  delete customOptions.errorText;

  return (
    <FormControlLabel
      control={<Checkbox label={label} {...customInput} {...customOptions} />}
      label={label}
      className={custom.classes.label}
    />
  );
};

// const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => {
//   const { errorText } = custom;
//   const customOptions = custom;
//   const options = custom.options();
//   delete customOptions.errorText;
//   delete customOptions.error;
//   delete customOptions.options;

//   let helperText = label;
//   if (errorText) {
//     helperText = errorText;
//   }
//   if (touched && error) {
//     helperText = error;
//   }

//   let hasError = touched && error;
//   if (errorText) {
//     hasError = true;
//   }
//   if (hasError) {
//     hasError = true;
//   }

//   const renderedOptions = options.map((option) => (
//     <MenuItem key={option} value={option}>
//       {option}
//     </MenuItem>
//   ));

//   return (
//     <>
//       <InputLabel htmlFor="country" error={hasError} required={false}>
//         Country
//       </InputLabel>
//       <Select
//         name="country"
//         value=""
//         error={hasError && true}
//         displayEmpty
//         {...input}
//         {...customOptions}
//       >
//         {renderedOptions}
//       </Select>
//       <FormHelperText error={hasError}>{helperText}</FormHelperText>
//     </>
//   );
// };

const validate = (values) => {
  const errors = {};
  const requiredFields = ['username', 'email', 'password', 'password1'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.password && values.password1 && values.password !== values.password1) {
    errors.password = 'Passwords do not match';
    errors.password1 = 'Passwords do not match';
  }

  if (values.email && isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.website && isValidUrl(values.website)) {
    errors.website = 'Invalid URL';
  }

  return errors;
};

const Register = ({ handleSubmit, submitting, pristine, classes, errors }) => (
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
        required
        name="acceptPrivacy"
        label="Accept&nbsp;"
        component={renderCheckboxField}
        className={classes.checkbox}
        errorText={errors.errors.title}
        classes={{ label: classes.labelLink }}
      />
      <Link to="/privacy-policy" className={classes.link}>
        Privacy Policy
      </Link>
    </div>
    <div className={classes.flex}>
      <Field
        required
        name="acceptTos"
        label="Accept&nbsp;"
        component={renderCheckboxField}
        className={classes.checkbox}
        errorText={errors.errors.title}
        classes={{ label: classes.labelLink }}
      />
      <Link to="/terms-of-service" className={classes.link}>
        Terms of Service
      </Link>
    </div>
    <div>
      <Button type="submit" variant="contained" disabled={pristine || submitting}>
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
