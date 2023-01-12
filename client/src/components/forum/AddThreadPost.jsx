import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import CKEditor from '@ckeditor/ckeditor5-react';

import { editorConfigSimple } from '@utils/ckeditorConfig';

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

const state = { text: null };

const renderEditor = ({ input, ...custom }) => (
  <CKEditor
    editor={ClassicEditor}
    config={editorConfigSimple}
    data={input.value}
    onChange={(event, editor) => {
      const data = editor.getData();
      state.text = data;
      input.onChange(data);
      custom.updateBody(data);
    }}
  />
);

const ThreadPostAddText = ({ handleSubmit, updateBody, submitting, postId, classes }) => {
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, state);
      }}
      className="mediumMargin"
    >
      <div className={classes.wysiwyg}>
        <Field name="text" label="Text" component={renderEditor} updateBody={updateBody} />
      </div>
      <div>
        <Button color="primary" type="submit" variant="contained" disabled={submitting}>
          Send
        </Button>
      </div>
    </form>
  );
};

ThreadPostAddText.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  postId: PropTypes.number.isRequired,
};

const ThreadPostAddForm = reduxForm({
  form: 'ThreadPostAddText',
})(ThreadPostAddText);

export default withStyles(styles)(ThreadPostAddForm);
