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
  if (errorText && touched) {
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
  const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const RolesAdd = ({ handleSubmit, submitting, languages, pristine, classes, errors }) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <Field
        required
        name="name"
        label="Name"
        component={renderTextField}
        className={classes.textField}
        error={errors.error}
        errorText="This name has already been used"
      />
    </div>
    {languages.map((language, index) => {
      return (
        <div key={language.id} className={classes.flex}>
          <Field
            required
            name={language.code}
            label={language.name}
            component={renderTextField}
            className={classes.textField}
            error={errors.error}
            errorText="This name has already been used"
          />
        </div>
      );
    })}
    <div>
      <Button color="primary" type="submit" variant="contained" disabled={pristine || submitting}>
        Add Role
      </Button>
    </div>
  </form>
);

RolesAdd.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const RolesAddForm = reduxForm({
  form: 'RolesAdd',
  validate,
})(RolesAdd);

export default withStyles(styles)(RolesAddForm);
