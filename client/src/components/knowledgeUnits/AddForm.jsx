import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
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
    textAlign: 'left',
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

  const options = custom.options.map((option) => (
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

const renderCheckboxField = ({
  input,
  label,
  ...custom
}) => {
  const customOptions = custom;
  const customInput = input;
  delete (customInput.value);
  delete (customOptions.errorText);

  return (
    <FormControlLabel
      control={(
        <Checkbox
          label={label}
          {...customInput}
          {...customOptions}
        />
      )}
      label={label}
    />
  );
};


const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'knowledgeType',
    'mediaType',
  ];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const KnowledgeUnitsAdd = ({
  handleSubmit,
  submitting,
  taxonomies,
  pristine,
  classes,
  invalid,
  errors,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="courseLevel"
            label="Level in Course"
            component={renderSelectField}
            options={taxonomies.courseLevel}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="knowledgeType"
            label="Knowledge Type"
            component={renderSelectField}
            options={taxonomies.knowledgeType}
            className={classes.textField}
            errorText={errors.errors.knowledgeType}
            required
          />
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="license"
            label="License"
            component={renderSelectField}
            options={taxonomies.licences}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
    </div>
    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="mediaType"
            label="Media Type"
            component={renderSelectField}
            options={taxonomies.mediaType}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="minimumScreenResolution"
            label="Minimum Screen Resolution"
            component={renderSelectField}
            options={taxonomies.minimumScreenResolution}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="eqflevel"
            label="EQF Level"
            component={renderSelectField}
            options={taxonomies.eqflevel}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
    </div>

    <div className={classes.flex}>
      <div>
        <FormControl>
          <Field
            name="suitableBlind"
            label="Suitable for blind"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            checked
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <Field
            name="suitableDeaf"
            label="Suitable for deaf"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            checked
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <Field
            name="suitableDumb"
            label="Suitable for dumb"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            checked
          />
        </FormControl>
      </div>
    </div>
    <div className={classes.flex}>
      <div>
        <FormControl>
          <Field
            name="publish"
            label="Publish"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            value="publish"
            checked
          />
        </FormControl>
      </div>
    </div>
    <div className={classes.flex}>
      <div>
        <FormControl>
          <Field
            name="visiblePublic"
            label="Visible Public"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            checked
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <Field
            name="visibleLexicon"
            label="Visible Lexicon"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            checked
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <Field
            name="visibleCourses"
            label="Visible Courses"
            component={renderCheckboxField}
            className={classes.textField}
            errorText={errors.errors.title}
            checked
          />
        </FormControl>
      </div>
    </div>

    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="objective"
            label="Objective"
            component={renderTextField}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="comment"
            label="Comment"
            component={renderTextField}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
    </div>

    <div className={classes.flex}>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="time"
            type="number"
            label="Time in minutes"
            component={renderTextField}
            className={classes.textField}
            errorText={errors.errors.title}
          />
        </FormControl>
      </div>
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="recommendedAge"
            label="Recommended Age"
            component={renderTextField}
            className={classes.textField}
            errorText={errors.errors.title}
            type="number"
            parse={val => parseInt(val, 10)}
          />
        </FormControl>
      </div>
    </div>
    <div>
      <Button
        type="submit"
        variant="contained"
        disabled={pristine || submitting || invalid}
      >
        Add Knowledge Unit
      </Button>
    </div>
  </form>
);

KnowledgeUnitsAdd.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
};

const KnowledgeUnitsAddForm = reduxForm({
  form: 'KnowledgeUnitsAdd',
  validate,
})(KnowledgeUnitsAdd);

export default withStyles(styles)(KnowledgeUnitsAddForm);
