import { TextField } from '@material-ui/core/index';

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

export default renderTextField;
