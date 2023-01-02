import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKEditor from '@ckeditor/ckeditor5-react';
import { editorConfigSimple } from '@utils/ckeditorConfig';
import { Field, reduxForm } from 'redux-form';
import { Button, FormControl, TextField } from '@material-ui/core/index';

const state = { text: null, threadId: null };

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

const renderEditor = ({ input, ...custom }) => (
  <CKEditor
    editor={ClassicEditor}
    config={editorConfigSimple}
    data={custom.initialValue}
    onChange={(event, editor) => {
      const data = editor.getData();
      state.text = data;
      input.onChange(data);
      custom.updateBody(data);
    }}
  />
);

const updateSummary = (value) => {
  state.summary = value.target.value;
};

const updateBody = (value) => {
  state.text = value;
};

const handleSubmit = (e, thread, handleUpdate, history) => {
  e.preventDefault();
  state.threadId = thread?.id;
  if (!handleUpdate) {
    return;
  }
  handleUpdate(e, state, history);
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ['summary'];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const { errorText } = custom;
  const customOptions = custom;
  delete customOptions.errorText;

  if (input.value === '' && custom?.initialValue) {
    input.value = custom?.initialValue;
  }

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
      value={input.value}
      {...input}
      {...customOptions}
    />
  );
};

const ForumTheadEdit = ({
  classes,
  user,
  thread,
  handleUpdate,
  history,
  errors,
  pristine,
  submitting,
}) => {
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, thread, handleUpdate, history);
      }}
    >
      <div className={classes.flex}>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <Field
              required
              name="summary"
              label="Summary"
              helperText="Insert a the title for this thread."
              component={renderTextField}
              className={classes.textField}
              onChange={updateSummary}
              initialValue={thread?.summary}
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
          initialValue={thread?.posts[0].text}
        />
      </div>
      <div>
        <Button color="primary" type="submit" variant="contained" disabled={pristine || submitting}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

ForumTheadEdit.propTypes = {
  user: PropTypes.shape({}).isRequired,
  thread: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

const ForumTheadEditForm = reduxForm({
  form: 'ForumTheadEdit',
  validate,
})(ForumTheadEdit);

export default withStyles(styles)(ForumTheadEditForm);
