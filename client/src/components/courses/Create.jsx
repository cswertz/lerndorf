import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { DataGrid } from '@material-ui/data-grid';
import { useCallback } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { renderTextField } from '@utils/forms';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../../node_modules/@material-ui/core/index';

const styles = {
  wrapper: {
    marginTop: '30px',
  },
  form: {
    width: '100%',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '30px',
  },
};

const useStyles = makeStyles((theme) => styles);

const validate = (values) => {
  const errors = {};
  /* const requiredFields = ['name'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  }); */

  return errors;
};

const Create = ({ handleSubmit, submitting, pristine, title }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Accordion expanded>
          <AccordionSummary aria-controls="title-content" id="title">
            <Typography>
              <strong>Title</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl required className={classes.formControl}>
              <Field
                required
                name="title"
                label="Title"
                helperText="Insert the title for the course."
                component={renderTextField}
                className={classes.textField}
              />
            </FormControl>
          </AccordionDetails>
        </Accordion>
        <Divider className={classes.divider} />
        <Button color="primary" type="submit" variant="contained" disabled={submitting}>
          Next
        </Button>
      </form>
    </div>
  );
};

Create.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const CreateCourseForm = reduxForm({
  form: 'CreateCourse',
  validate,
})(Create);

export default withStyles(styles)(CreateCourseForm);
