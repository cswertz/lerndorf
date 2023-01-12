import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKEditor from '@ckeditor/ckeditor5-react';

import editorConfig from '@utils/ckeditorConfig';

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  textField: {
    flex: 1,
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
  wysiwyg: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    textAlign: 'left',
  },
});

const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => {
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

  let hasError = touched && error;
  if (errorText) {
    hasError = true;
  }
  if (hasError) {
    hasError = true;
  }

  const options = custom.options.map((option) => (
    <MenuItem key={option.key} value={option.key}>
      {option.value}
    </MenuItem>
  ));

  return (
    <>
      <InputLabel htmlFor="language" error={hasError} required={false} />
      <Select
        name="language"
        value=""
        error={hasError && true}
        displayEmpty
        {...input}
        {...customOptions}
      >
        {options}
      </Select>
      <FormHelperText error={hasError}>{helperText}</FormHelperText>
    </>
  );
};

const renderEditor = ({ input, ...custom }) => (
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
  const requiredFields = ['language'];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const TextsEdit = ({
  handleSubmit,
  updateBody,
  submitting,
  languages,
  pristine,
  classes,
  errors,
}) => {
  const languageOptions = languages.map((language) => ({
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
        <Field name="text" label="Text" component={renderEditor} updateBody={updateBody} />
      </div>
      <div>
        <Button color="primary" type="submit" variant="contained" disabled={pristine || submitting}>
          Save Text
        </Button>
      </div>
    </form>
  );
};

TextsEdit.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateBody: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

const TextsEditForm = reduxForm({
  form: 'TextsEdit',
  validate,
})(TextsEdit);

export default withStyles(styles)(TextsEditForm);
