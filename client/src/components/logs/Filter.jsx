import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import List from '@material-ui/core/List';

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
      {option.name}
    </MenuItem>
  ));

  return (
    <>
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
    </>
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

const LogsFilter = ({
  handleFilterUpdate,
  languages,
  classes,
}) => {
  return (
    <form onSubmit={handleFilterUpdate}>
      <div className={classes.flex1}>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <Field
              name="language"
              label="Language"
              component={renderSelectField}
              options={languages}
              className={classes.textField}
            />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField
              name="userId"
              label="User ID"
              className={classes.textField}
            />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField
              name="courseId"
              label="Course ID"
              className={classes.textField}
            />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField
              name="luId"
              label="Learning Unit ID"
              className={classes.textField}
            />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField
              name="kuId"
              label="Knowledge Unit ID"
              className={classes.textField}
            />
          </FormControl>
        </div>

        <div className={classes.buttonWrapper}>
          <Button
            type="submit"
            variant="contained"
          >
            Update Preview
          </Button>
        </div>
      </div>
    </form>
  );
};

LogsFilter.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleFilterUpdate: PropTypes.func.isRequired,
};

const LogsFilterForm = reduxForm({
  form: 'LogsFilter',
  validate,
})(LogsFilter);

export default withStyles(styles)(LogsFilterForm);
