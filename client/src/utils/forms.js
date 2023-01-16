import { TextField, TextareaAutosize } from '@material-ui/core/index';

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

const renderTextareaField = ({ input, label, meta: { touched, error }, ...custom }) => {
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
      multiline
      rows={4}
      maxRows={6}
      helperText={helperText}
      error={hasError && true}
      label={label}
      {...input}
      {...customOptions}
    />
  );
};

export { renderTextField, renderTextareaField };
