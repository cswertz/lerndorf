import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { useCallback, useEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { renderTextField, renderTextareaField, renderSelect } from '@utils/forms';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
} from '../../../node_modules/@material-ui/core/index';
import CourseUsers from './CourseUsers';
import AddUserToCourse from './AddUserToCourse';
import { lang } from '../../../node_modules/moment/moment';
import CourseContent from './CourseContent';
import AddContentToCourse from './AddContentToCourse';
import CourseSequences from './CourseSequences';
import AddSequenceToCourse from './AddSequenceToCourse';

const styles = {
  wrapper: {
    marginTop: '30px',
  },
  form: {
    width: '100%',
  },
  full: {
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
  formControlCourseDates: {
    width: 'calc(100% - 10px)',
    margin: '20px 0 0',
  },
  textField: {
    width: '100%',
  },
  marginTop: {
    marginTop: '20px',
  },
};

const useStyles = makeStyles((theme) => styles);

const validate = (values) => {
  const errors = {};

  const requiredFields = ['title'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

const Edit = ({
  handleSubmit,
  submitting,
  pristine,
  title,
  initialValues,
  languages,
  actions,
  user,
  roles,
  course,
}) => {
  const classes = useStyles();

  const [openPanel, setOpenPanel] = useState('title');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setOpenPanel(newExpanded ? panel : false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (course.fetched === true) {
        setIsLoading(false);
      }
    }, 150);
  }, [course]);

  return (
    <div className={classes.wrapper}>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          setTimeout(() => {
            handleSubmit(e);
          }, 50);
        }}
      >
        <Accordion expanded={openPanel === 'title'} onChange={handleChange('title')}>
          <AccordionSummary aria-controls="title-content" id="title">
            <Typography>
              <strong>Title</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              <Grid spacing={0} xs={12} sm={6}>
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
              <Grid spacing={0} xs={12} sm={6}>
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
              <Grid spacing={0} xs={12} sm={12}>
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
              <Grid spacing={0} xs={12} sm={6}>
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
              <Grid spacing={0} xs={12} sm={6}>
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
              <Grid spacing={0} xs={12} sm={12}>
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
                <FormGroup className={classes.formControlSwitches}>
                  <FormControlLabel
                    name="enrolmentByTutor"
                    control={
                      <Switch
                        color="secondary"
                        defaultChecked={initialValues.enrolmentByTutor === true}
                      />
                    }
                    label="Confirmation by Tutor"
                  />
                </FormGroup>
                <FormGroup className={classes.formControlSwitches}>
                  <FormControlLabel
                    name="visible"
                    control={
                      <Switch color="secondary" defaultChecked={initialValues.visible === true} />
                    }
                    label="Visible / Published"
                  />
                </FormGroup>
                <FormGroup className={classes.formControlSwitches}>
                  <FormControlLabel
                    name="copyAllowed"
                    control={
                      <Switch
                        color="secondary"
                        defaultChecked={initialValues.copyAllowed === true}
                      />
                    }
                    label="Allow to copy the course"
                  />
                </FormGroup>
                <FormGroup className={classes.formControlSwitches}>
                  <FormControlLabel
                    name="activateForum"
                    control={
                      <Switch
                        color="secondary"
                        defaultChecked={initialValues.activateForum === true}
                      />
                    }
                    label="Allow the useage of the forum"
                  />
                </FormGroup>
              </Grid>
              <Grid spacing={0} xs={12} sm={6}>
                <FormControl className={classes.formControlCourseDates}>
                  <Field
                    required
                    name="courseStart"
                    label="Start of course"
                    helperText="Please insert a date in the following format: YYYY-MM-DD"
                    component={renderTextField}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid spacing={0} xs={12} sm={6}>
                <FormControl required className={classes.formControlCourseDates}>
                  <Field
                    name="courseEnd"
                    label="End of course"
                    helperText="Please insert a date in the following format: YYYY-MM-DD"
                    component={renderTextField}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid spacing={0} xs={12}>
                <FormControl required className={classes.formTextareaControl}>
                  <Field
                    name="mainLanguage"
                    label="Main language"
                    component={renderSelect}
                    options={languages.map((language) => {
                      return { value: language.id, label: language.name, id: language.id };
                    })}
                    className={classes.textField}
                  />
                </FormControl>
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
            <div className={classes.full}>
              <Grid container spacing={0}>
                <Grid spacing={0} xs={12} className={classes.full}>
                  <CourseUsers
                    course={initialValues}
                    actions={actions}
                    showConfirmation={initialValues.enrolmentConfirmation}
                    user={user}
                    className={classes.full}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0} className={classes.marginTop}>
                <Grid spacing={0} xs={12} className={classes.full} align="right">
                  <AddUserToCourse
                    course={initialValues}
                    actions={actions}
                    roles={roles}
                    handleSubmit={(userId, userRole) => {
                      actions.courseUserAdd(initialValues.id, userId, userRole).then((result) => {
                        actions.courseFetchSingle(initialValues.id);
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={openPanel === 'content'} onChange={handleChange('content')}>
          <AccordionSummary aria-controls="content-content" id="content">
            <Typography>
              <strong>Content</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.full}>
              <Grid container spacing={0}>
                <Grid spacing={0} xs={12} className={classes.full}>
                  <CourseContent
                    course={initialValues}
                    actions={actions}
                    user={user}
                    className={classes.full}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0} className={classes.marginTop}>
                <Grid spacing={0} xs={12} className={classes.full} align="right">
                  <AddContentToCourse
                    user={user}
                    course={initialValues}
                    actions={actions}
                    handleSubmit={(contentIds) => {
                      Promise.all(
                        contentIds.map((contentId) =>
                          actions.courseContentAdd(initialValues.id, contentId),
                        ),
                      ).then((result) => {
                        actions.courseFetchSingle(initialValues.id);
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={openPanel === 'sequences'} onChange={handleChange('sequences')}>
          <AccordionSummary aria-controls="sequences-content" id="sequences">
            <Typography>
              <strong>Sequences</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.full}>
              <Grid container spacing={0}>
                <Grid spacing={0} xs={12} className={classes.full}>
                  <CourseSequences
                    user={user.user}
                    course={initialValues}
                    actions={actions}
                    className={classes.full}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0} className={classes.marginTop}>
                <Grid spacing={0} xs={12} className={classes.full} align="right">
                  <AddSequenceToCourse
                    user={user.user}
                    course={initialValues}
                    actions={actions}
                    handleSubmit={(sequenceDetail) => {
                      actions
                        .courseSequenceAdd(
                          initialValues.id,
                          sequenceDetail.name,
                          sequenceDetail.list,
                        )
                        .then((result) => {
                          actions.courseFetchSingle(initialValues.id);
                        });
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
        <Divider className={classes.divider} />
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={submitting || isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </div>
  );
};

Edit.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
};

const EditCourseForm = reduxForm({
  form: 'CreateCourse',
  validate,
})(Edit);

export default withStyles(styles)(EditCourseForm);
