import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  const { errorText } = custom;
  const customOptions = custom;
  delete customOptions.errorText;
  delete customOptions.error;

  let helperText = label;
  if (errorText) {
    helperText = errorText;
  }
  if (touched && error) {
    helperText = error;
  }

  let hasError = (touched && error);
  if (errorText) {
    hasError = true;
  }
  if (hasError) {
    hasError = true;
  }

  const options = custom.options.map(option => (
    <MenuItem
      key={option.key}
      value={option.key}
    >
      {option.value}
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <InputLabel
        htmlFor="language"
        error={hasError}
        required={false}
      />
      <Select
        name="language"
        value=""
        error={(hasError && true)}
        displayEmpty
        {...input}
        {...customOptions}
      >
        {options}
      </Select>
      <FormHelperText
        error={hasError}
      >
        {helperText}
      </FormHelperText>
    </React.Fragment>
  );
};

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

  let hasError = (touched && error);
  if (errorText) {
    hasError = true;
  }

  return (
    <TextField
      helperText={helperText}
      error={(hasError && true)}
      label={label}
      {...input}
      {...customOptions}
    />
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'title',
    'language',
  ];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const LearningUnitsAdd = ({
  handleSubmit,
  submitting,
  languages,
  pristine,
  classes,
  errors,
}) => {
  const languageOptions = languages.map(language => ({
    key: language.id,
    value: language.name,
  }));

  return (
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
              errorText={errors.errors.title}
            />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <Field
              name="language"
              label="Language"
              options={languageOptions}
              component={renderSelectField}
              className={classes.selectField}
              errorText={errors.errors.code}
            />
          </FormControl>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={pristine || submitting}
        >
          Add Learning Unit
        </Button>
      </div>
    </form>
  );
};

LearningUnitsAdd.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

const LearningUnitsAddForm = reduxForm({
  form: 'LearningUnitsAdd',
  validate,
})(LearningUnitsAdd);

export default withStyles(styles)(LearningUnitsAddForm);
