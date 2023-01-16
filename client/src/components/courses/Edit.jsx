import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { useCallback, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { renderTextField, renderTextareaField } from '@utils/forms';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
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
  formControl: {
    width: 'calc(100% - 10px)',
  },
  formTextareaControl: {
    width: 'calc(100% - 10px)',
    margin: '20px 0',
  },
  formControlSwitches: {
    margin: '10px 10px',
  },
  textField: {
    width: '100%',
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

const Edit = ({ handleSubmit, submitting, pristine, title, initialValues }) => {
  const classes = useStyles();

  const [openPanel, setOpenPanel] = useState('title');

  const handleChange = (panel) => (event, newExpanded) => {
    setOpenPanel(newExpanded ? panel : false);
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Accordion expanded={openPanel === 'title'} onChange={handleChange('title')}>
          <AccordionSummary aria-controls="title-content" id="title">
            <Typography>
              <strong>Title</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6}>
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
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl required className={classes.formControl}>
                  <Field
                    name="shortTitle"
                    label="Short title"
                    helperText="Insert the short title for the course."
                    component={renderTextField}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={12}>
                <FormControl className={classes.formTextareaControl}>
                  <Field
                    name="description"
                    label="Description"
                    helperText="Please describe the course"
                    component={renderTextareaField}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={openPanel === 'enrolement'} onChange={handleChange('enrolement')}>
          <AccordionSummary aria-controls="enrolement-content" id="enrolement">
            <Typography>
              <strong>Enrolment</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <Field
                    required
                    name="enrolmentStart"
                    label="Start of enrolement"
                    helperText="Please insert a date in the following format: YYYY-MM-DD"
                    component={renderTextField}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6}>
                <FormControl required className={classes.formControl}>
                  <Field
                    name="enrolmentEnd"
                    label="End of enrolement"
                    helperText="Please insert a date in the following format: YYYY-MM-DD"
                    component={renderTextField}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={12}>
                <FormGroup className={classes.formControlSwitches}>
                  <FormControlLabel
                    name="enrolmentConfirmation"
                    control={
                      <Switch
                        color="secondary"
                        defaultChecked={initialValues.enrolmentConfirmation === true}
                      />
                    }
                    label="Confirmation for Enrolement"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={openPanel === 'participants'} onChange={handleChange('participants')}>
          <AccordionSummary aria-controls="participants-content" id="participants">
            <Typography>
              <strong>Participants</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>TODO:</span>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={openPanel === 'content'} onChange={handleChange('content')}>
          <AccordionSummary aria-controls="content-content" id="content">
            <Typography>
              <strong>Content</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>TODO:</span>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={openPanel === 'sequences'} onChange={handleChange('sequences')}>
          <AccordionSummary aria-controls="sequences-content" id="sequences">
            <Typography>
              <strong>Sequences</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>TODO:</span>
          </AccordionDetails>
        </Accordion>
        <Divider className={classes.divider} />
        <Button color="primary" type="submit" variant="contained" disabled={submitting}>
          Save
        </Button>
      </form>
    </div>
  );
};

Edit.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const EditCourseForm = reduxForm({
  form: 'CreateCourse',
  validate,
})(Edit);

export default withStyles(styles)(EditCourseForm);
