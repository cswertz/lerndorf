import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

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
  select: {
    marginLeft: 0,
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

// const renderCheckboxField = ({ input, label, ...custom }) => {
//   const customOptions = custom;
//   const customInput = input;
//   delete customInput.value;
//   delete customOptions.errorText;

//   return (
//     <FormControlLabel
//       control={<Checkbox color="primary" label={label} {...customInput} {...customOptions} />}
//       label={label}
//       className={custom.customclasses.label}
//     />
//   );
// };

const renderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => {
  const { errorText, options } = custom;
  const customOptions = custom;
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
    <MenuItem key={option.id} value={option.id}>
      {option.name}
    </MenuItem>
  ));

  return (
    <>
      <InputLabel htmlFor="language" error={hasError} required={false}>
        Language
      </InputLabel>
      <Select
        style={{ marginLeft: 0 }}
        name="language"
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

  return errors;
};

const Language = ({ handlePreferred, handleSubmit, handleDelete, languages, classes, user }) => {
  const userLanguages = user.Languages;
  const { preferredLanguage } = user;

  const getLanguageList = () => {
    const languageList = userLanguages.map((language) => {
      const userLanguage = language.UserLanguage;

      const getFavoriteButton = () => {
        if (userLanguage.id === preferredLanguage) {
          return (
            <IconButton aria-label="Favorite">
              <FavoriteIcon style={{ color: 'red' }} />
            </IconButton>
          );
        }

        return (
          <IconButton
            aria-label="Favorite"
            title="Set as preferred language"
            onClick={() => handlePreferred(userLanguage.id)}
          >
            <FavoriteIcon />
          </IconButton>
        );
      };

      return (
        <ListItem key={userLanguage.id}>
          <ListItemText primary={`${language.name} (Level: ${userLanguage.level})`} />
          <ListItemSecondaryAction>
            {getFavoriteButton()}
            <IconButton aria-label="Delete" onClick={() => handleDelete(userLanguage.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });

    return <List dense={false}>{languageList}</List>;
  };

  return (
    <div>
      <div>{getLanguageList()}</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container className={classes.container} spacing={2}>
          <Grid item xs={12} sm={9}>
            <FormControl required className={classes.formControl}>
              <Field
                name="language"
                label="Language"
                component={renderSelectField}
                options={languages}
                className={classes.textField}
                required
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <Field
                required
                name="level"
                label="Level"
                type="number"
                component={renderTextField}
                className={classes.textField}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <p>
              <Button
                className={classes.fullWidth}
                type="submit"
                color="primary"
                variant="contained"
              >
                Add Language
              </Button>
            </p>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Language.propTypes = {
  handlePreferred: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    Languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    preferredLanguage: PropTypes.number,
  }).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const LanguageForm = reduxForm({
  form: 'Language',
  validate,
})(Language);

export default withStyles(styles)(LanguageForm);
