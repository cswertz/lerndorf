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
  const requiredFields = ['type', 'code'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const RolesEdit = ({
  initialValues,
  handleSubmit,
  submitting,
  languages,
  pristine,
  classes,
  errors,
}) => {
  for (const language of initialValues.Languages) {
    initialValues[language.code] = language.RoleLanguage.vocable;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.flex}>
        <Field
          required
          name="name"
          label="Name"
          component={renderTextField}
          className={classes.textField}
          errorText={errors.errors.name}
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
            />
          </div>
        );
      })}
      <div>
        <Button color="primary" type="submit" variant="contained" disabled={pristine || submitting}>
          Save
        </Button>
      </div>
    </form>
  );
};

RolesEdit.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const RolesEditForm = reduxForm({
  form: 'RolesEdit',
  validate,
})(RolesEdit);

export default withStyles(styles)(RolesEditForm);
