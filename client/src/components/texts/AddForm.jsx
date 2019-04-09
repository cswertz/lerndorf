import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';

import CustomUploadAdapterPlugin from '../../utils/ckeditorPlugins';

const editorConfig = {
  extraPlugins: [CustomUploadAdapterPlugin],
};

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
  wysiwyg: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: 'left',
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

const renderEditor = ({
  input,
  ...custom
}) => (
  <CKEditor
    editor={ClassicEditor}
    config={editorConfig}
    data={input.value}
    onChange={(event, editor) => {
      const data = editor.getData();
      custom.updateBody(data);
      input.onChange(data);
    }}
  />
);

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'language',
  ];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const TextsAdd = ({
  handleSubmit,
  updateBody,
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
      <div className={classes.wysiwyg}>
        <Field
          name="text"
          label="Text"
          component={renderEditor}
          updateBody={updateBody}
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={pristine || submitting}
        >
          Add Text
        </Button>
      </div>
    </form>
  );
};

TextsAdd.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  updateBody: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const TextsAddForm = reduxForm({
  form: 'TextsAdd',
  validate,
})(TextsAdd);

export default withStyles(styles)(TextsAddForm);
