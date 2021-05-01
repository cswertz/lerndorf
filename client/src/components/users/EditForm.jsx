import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import BinaryDialog from '../DialogBinary';

import { isValidEmail, getCountries, isValidUrl } from '../../utils/user';

const styles = (theme) => ({
  textField: {
    flex: 1,
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  flex: {
    display: 'flex',
  },
  label: {
    marginLeft: '0',
  },
  labelLink: {
    marginLeft: '0',
    marginRight: '0',
  },
  formControl: {
    margin: 0,
    flex: 1,
    minWidth: 120,
    textAlign: 'left',
  },
  pictureButton: {
    width: '100%',
    marginTop: 25,
  },
  container: {
    textAlign: 'left',
  },
  fullWidth: {
    width: '100%',
  },
});

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

  return (
    <TextField
      helperText={helperText}
      error={(touched && error) || errorText}
      label={label}
      value={input.value}
      {...input}
      {...customOptions}
    />
  );
};

const renderCheckboxField = ({ input, label, ...custom }) => {
  const customOptions = custom;
  const customInput = input;
  delete customInput.value;
  delete customOptions.errorText;

  return (
    <FormControlLabel
      control={<Checkbox label={label} {...customInput} {...customOptions} />}
      label={label}
      className={custom.customclasses.label}
    />
  );
};

const renderImageField = ({ handleImageUpdate, input, ...custom }) => {
  const hasProfilePicture = custom.picture;
  const style = {
    image: {
      float: 'left',
      maxHeight: '76px',
    },
    wrapper: {
      display: 'flex',
    },
  };
  let buttonText = 'Upload Profile Picture';
  let profilePicture = '';
  if (hasProfilePicture) {
    buttonText = 'Change Profile Picture';
    profilePicture = <img alt="Profile" style={style.image} src={`/uploads/${custom.picture}`} />;
  }

  return (
    <div style={style.wrapper}>
      {profilePicture}
      <div>
        <label
          id="picture-label"
          htmlFor="picture"
          nesting="asdfasdf"
          className={custom.classes.textField}
        >
          <Button variant="contained" component="span" className={custom.classes.pictureButton}>
            {buttonText}
          </Button>
        </label>
        <input
          accept="image/*"
          className={custom.classes.input}
          style={{ display: 'none' }}
          name="picture"
          id="picture"
          type="file"
          onChange={(event) => {
            const data = event.target.value;
            input.onChange(data);
            if (event.target.files.length > 0) {
              handleImageUpdate(event.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const { errorText } = custom;
  const customOptions = custom;
  const options = custom.options();
  delete customOptions.errorText;
  delete customOptions.error;
  delete customOptions.options;

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

  const renderedOptions = options.map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ));

  return (
    <>
      <InputLabel htmlFor="country" error={hasError} required={false}>
        Country
      </InputLabel>
      <Select
        name="country"
        value=""
        error={hasError && true}
        displayEmpty
        {...input}
        {...customOptions}
      >
        {renderedOptions}
      </Select>
      <FormHelperText error={hasError}>{helperText}</FormHelperText>
    </>
  );
};

const validate = (values) => {
  const errors = {};
  const requiredFields = ['email'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.password && values.password1 && values.password !== values.password1) {
    errors.password = 'Passwords do not match';
    errors.password1 = 'Passwords do not match';
  }

  if (values.email && isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (values.website && isValidUrl(values.website)) {
    errors.website = 'Invalid URL';
  }

  return errors;
};

const UserEdit = ({
  handleImageUpdate,
  closeLogDeletionDialog,
  openLogDeletionDialog,
  logDeletionDialogOpen,
  submitLogDeletion,
  closeAccountDeletionDialog,
  openAccountDeletionDialog,
  accountDeletionDialogOpen,
  submitAccountDeletion,
  handleSubmit,
  submitting,
  pristine,
  invalid,
  classes,
  errors,
  user,
}) => (
  <form onSubmit={(e) => handleSubmit(e)}>
    <div className={classes.flex}>
      <Field
        required
        name="email"
        label="E-Mail"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errors.email}
      />
    </div>
    <div className={classes.flex}>
      <Field
        type="password"
        name="password"
        label="Password"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        type="password"
        name="password1"
        label="Repeat Password"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div className={classes.flex}>
      <Field
        name="titlePrefix"
        label="Title Prefix"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="firstName"
        label="First name"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="lastName"
        label="Last Name"
        component={renderTextField}
        className={classes.textField}
      />
      <Field
        name="titleSuffix"
        label="Title Suffix"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <div className={classes.flex}>
      <Field
        type="date"
        name="birthdate"
        label="Birthdate"
        component={renderTextField}
        className={classes.textField}
        InputLabelProps={{ shrink: true }}
      />
      <Field
        name="studyId"
        label="Study ID"
        component={renderTextField}
        className={classes.textField}
      />
      <Field name="phone" label="Phone" component={renderTextField} className={classes.textField} />
    </div>
    <div className={classes.flex}>
      <Field
        name="street"
        label="Address"
        component={renderTextField}
        className={classes.textField}
      />
      <Field name="zip" label="Zip" component={renderTextField} className={classes.textField} />
      <Field name="city" label="City" component={renderTextField} className={classes.textField} />
      <Field name="state" label="State" component={renderTextField} className={classes.textField} />
      <div className={classes.wrapper}>
        <FormControl required className={classes.formControl}>
          <Field
            name="country"
            label="Country"
            component={renderSelectField}
            options={getCountries}
            className={classes.textField}
            required={false}
          />
        </FormControl>
      </div>
    </div>
    <div className={classes.flex}>
      <Field
        name="website"
        label="Website"
        component={renderTextField}
        className={classes.textField}
        errorText={errors.errors.website}
      />
      <Field
        name="picture"
        label="Picture"
        component={renderImageField}
        classes={classes}
        picture={user.picture}
        handleImageUpdate={handleImageUpdate}
      />
    </div>
    <div className={classes.flex}>
      <Field
        cols={120}
        rows={4}
        multiline
        rowsMax={4}
        name="description"
        label="Description"
        component={renderTextField}
        className={classes.textField}
      />
    </div>
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={9}>
        <div className={classes.flex}>
          <Field
            name="allowBasicLog"
            label="Record basic log data and use it for improved usability and personal feedback"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
        <div className={classes.flex}>
          <Field
            name="allowLogResearch"
            label="Recored my log data and allow anonymised access for researchers"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
        <div className={classes.flex}>
          <Field
            name="allowLogSharing"
            label="Share my anonymised log data with others for advanced personal feedback"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
        <div className={classes.flex}>
          <Field
            name="allowLogReports"
            label="Record my log data and use it for reports to teachers and administrators"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
        <div className={classes.flex}>
          <Field
            name="showProfilePublic"
            label="Show my profile to the public"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
        <div className={classes.flex}>
          <Field
            name="showProfileStudents"
            label="Show my profile to other students"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
        <div className={classes.flex}>
          <Field
            name="showProfileTeachers"
            label="Show my profile to teachers"
            component={renderCheckboxField}
            className={classes.checkbox}
            customclasses={{ label: classes.labelLink }}
            type="checkbox"
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={3}>
        <p>
          <Button variant="contained" className={classes.fullWidth}>
            Show logged data
          </Button>
        </p>
        <p>
          <Button variant="contained" className={classes.fullWidth} onClick={openLogDeletionDialog}>
            Delete logged data
          </Button>
        </p>
        <p>
          <Button
            variant="contained"
            className={classes.fullWidth}
            onClick={openAccountDeletionDialog}
          >
            Delete Account
          </Button>
        </p>
      </Grid>
    </Grid>
    <div>
      <Button type="submit" variant="contained" disabled={pristine || submitting || invalid}>
        Save
      </Button>
    </div>
    <BinaryDialog
      open={logDeletionDialogOpen}
      onClose={closeLogDeletionDialog}
      onConfirm={submitLogDeletion}
      submitLogDeletion={submitLogDeletion}
      title="Delete Logs"
      text="Are you sure you want to delete your Log files?"
    />
    <BinaryDialog
      open={accountDeletionDialogOpen}
      onClose={closeAccountDeletionDialog}
      onConfirm={submitAccountDeletion}
      submitLogDeletion={submitAccountDeletion}
      title="Delete Account"
      text="Are you sure you want to delete your account?"
    />
  </form>
);

UserEdit.propTypes = {
  handleImageUpdate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  logDeletionDialogOpen: PropTypes.bool.isRequired,
  closeLogDeletionDialog: PropTypes.func.isRequired,
  openLogDeletionDialog: PropTypes.func.isRequired,
  submitLogDeletion: PropTypes.func.isRequired,
  accountDeletionDialogOpen: PropTypes.bool.isRequired,
  closeAccountDeletionDialog: PropTypes.func.isRequired,
  openAccountDeletionDialog: PropTypes.func.isRequired,
  submitAccountDeletion: PropTypes.func.isRequired,
};

const UserEditForm = reduxForm({
  form: 'UserEdit',
  validate,
})(UserEdit);

export default withStyles(styles)(UserEditForm);
