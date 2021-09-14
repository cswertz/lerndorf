import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useRef } from 'react';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import Suggest from '@containers/learningUnits/Suggest';

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
    <MenuItem key={option.id} value={option.id}>
      {option.name}
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

const validate = (values) => {
  const errors = {};
  const requiredFields = ['knowledgeType', 'mediaType'];
  requiredFields.forEach((field) => {
    if (!values[field] || values[field] === '') {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const LogsFilter = ({ handleFilterUpdate, languages, suggestions, fetchSuggestions, classes }) => {
  const allLanguages = [
    {
      id: -1,
      name: 'All',
    },
  ].concat(languages);
  const luIdRef = useRef(null);

  function update(e) {
    e.preventDefault();

    const filters = {
      user_id: parseInt(e.target.userId.value, 10) || null,
      course_id: parseInt(e.target.courseId.value, 10) || null,
      learning_unit_id: luIdRef.current || parseInt(e.target.luId.value, 10) || null,
      knowledge_unit_id: parseInt(e.target.kuId.value, 10) || null,
      language_id: parseInt(e.target.language.value, 10) || null,
      date_from: e.target.dateFrom.value ? new Date(e.target.dateFrom.value).toISOString() : null,
      date_to: e.target.dateTo.value ? new Date(e.target.dateTo.value).toISOString() : null,
    };

    console.log(filters);

    // handleFilterUpdate(filters);
  }

  function setTarget(id) {
    luIdRef.current = id;
  }

  return (
    <form onSubmit={update}>
      <div className={classes.flex1}>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <Field
              name="language"
              label="Language"
              component={renderSelectField}
              options={allLanguages}
              className={classes.textField}
            />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField name="userId" label="User ID" className={classes.textField} />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField name="courseId" label="Course ID" className={classes.textField} />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <div className={classes.textField}>
              <Suggest
                suggestions={suggestions}
                fetchSuggestions={fetchSuggestions}
                setTarget={setTarget}
              />
            </div>
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField name="luId" label="Learning Unit ID" className={classes.textField} />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField name="kuId" label="Knowledge Unit ID" className={classes.textField} />
          </FormControl>
        </div>
        <div className={classes.wrapper}>
          <FormControl required className={classes.formControl}>
            <TextField
              type="date"
              name="dateFrom"
              label="Date From"
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl required className={classes.formControl}>
            <TextField
              type="date"
              name="dateTo"
              label="Date To"
              className={classes.textField}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
        </div>

        <div className={classes.buttonWrapper}>
          <Button type="submit" color="primary" variant="contained">
            Update Preview
          </Button>
        </div>
      </div>
    </form>
  );
};

LogsFilter.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleFilterUpdate: PropTypes.func.isRequired,
};

const LogsFilterForm = reduxForm({
  form: 'LogsFilter',
  validate,
})(LogsFilter);

export default withStyles(styles)(LogsFilterForm);