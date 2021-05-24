import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flex: 1,
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
  },
  selectField: {
    textAlign: 'left',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
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
      error={hasError && true}
      label={label}
      {...input}
      {...customOptions}
    />
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ['tag'];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const LearningUnitsTag = ({ handleSubmit, submitting, pristine, classes }) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            required
            name="tag"
            label="Tag"
            component={renderTextField}
            className={classes.textField}
          />
        </FormControl>
      </div>
    </div>
    <div>
      <Button type="submit" color="primary" variant="contained" disabled={pristine || submitting}>
        Add Tag
      </Button>
    </div>
  </form>
);

LearningUnitsTag.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const LearningUnitsTagForm = reduxForm({
  form: 'LearningUnitsTag',
  validate,
})(LearningUnitsTag);

export default withStyles(styles)(LearningUnitsTagForm);
