import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, MenuItem, Tabs } from '../../../node_modules/@material-ui/core/index';
import { Tab } from '../../../node_modules/@material-ui/icons/index';

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

const Show = ({ title, languages, actions, user, roles, course }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {course?.item.activateForum && <Link to={`/courses/${course.item.id}/forum`}>Forum</Link>}
    </div>
  );
};

Show.propTypes = {
  course: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Show);
