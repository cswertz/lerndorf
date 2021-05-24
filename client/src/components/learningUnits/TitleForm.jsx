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
      value={input.value}
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

const LearningUnitsTitle = ({ handleSubmit, submitting, pristine, classes, title }) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            required
            name="title"
            label="Title"
            component={renderTextField}
            className={classes.textField}
          />
        </FormControl>
      </div>
    </div>
    <div>
      <Button color="primary" type="submit" variant="contained" disabled={pristine || submitting}>
        Save Title
      </Button>
    </div>
  </form>
);

LearningUnitsTitle.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const LearningUnitsTitleForm = reduxForm({
  form: 'LearningUnitsTitle',
  validate,
})(LearningUnitsTitle);

export default withStyles(styles)(LearningUnitsTitleForm);
