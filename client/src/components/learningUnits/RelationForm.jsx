import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  textField: {
    flex: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
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
      key={option.id}
      value={option.id}
    >
      {option.type}
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
    'tag',
  ];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const LearningUnitsRelation = ({
  handleSubmit,
  submitting,
  taxonomies,
  pristine,
  classes,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            required
            name="target"
            label="Target"
            component={renderTextField}
            className={classes.textField}
            type="number"
          />
        </FormControl>
      </div>

      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="type"
            label="Relation"
            component={renderSelectField}
            options={taxonomies.items.relationType}
            className={classes.textField}
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
        Add Relation
      </Button>
    </div>
  </form>
);

LearningUnitsRelation.propTypes = {
  taxonomies: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const LearningUnitsRelationForm = reduxForm({
  form: 'LearningUnitsRelation',
  validate,
})(LearningUnitsRelation);

export default withStyles(styles)(LearningUnitsRelationForm);
