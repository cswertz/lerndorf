import { withRouter, Link } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Show from '@components/forum/Show';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PlayArrow, Assignment, Add } from '@material-ui/icons/index';
import { Grid } from '@material-ui/core/index';
import Edit from '@components/courses/Edit';

const moment = require('moment');

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

class EditCourse extends Component {
  componentDidMount() {
    const { actions, match } = this.props;
    this.fetchData();
  }

  componentDidUpdate() {
    const { actions, match, history, course } = this.props;
  }

  fetchData() {
    const { actions, history, match } = this.props;
    actions.languagesFetch();
    actions.courseFetchSingle(match.params.id).catch((err) => {
      history.push('/courses/my');
    });
  }

  render() {
    const { user, courses, course, languages, actions, history, match, state } = this.props;

    let content = null;

    if (course.fetched && course.item?.id === parseInt(match.params.id, 10)) {
      content = (
        <>
          <Typography variant="h1">Edit course (ID: {match.params.id})</Typography>
          <Edit
            actions={actions}
            languages={languages?.languages ?? []}
            initialValues={course.item}
            handleSubmit={(e) => {
              e.preventDefault();
              if (e.target.title.value?.length === 0) {
                return;
              }

              const updateData = {
                title: e.target.title.value,
                shortTitle: e.target.shortTitle.value,
                description: e.target.description.value,
                enrolmentConfirmation: e.target.enrolmentConfirmation.checked,
                enrolmentByTutor: e.target.enrolmentByTutor.checked,
                visible: e.target.visible.checked,
                copyAllowed: e.target.copyAllowed.checked,
                mainLanguage: e.target.mainLanguage.value,
                activateForum: e.target.activateForum.checked,
              };

              // Handle the dates
              if (e.target.enrolmentStart.value) {
                try {
                  updateData.enrolmentStart = moment
                    .utc(e.target.enrolmentStart.value)
                    .startOf('day');
                } catch (err) {
                  console.error('Invalid date format');
                }
              }
              if (e.target.enrolmentEnd.value) {
                try {
                  updateData.enrolmentEnd = moment.utc(e.target.enrolmentEnd.value).startOf('day');
                } catch (err) {
                  console.error('Invalid date format');
                }
              }
              if (e.target.enrolmentEnd.value) {
                try {
                  updateData.courseStart = moment.utc(e.target.courseStart.value).startOf('day');
                } catch (err) {
                  console.error('Invalid date format');
                }
              }
              if (e.target.courseEnd.value) {
                try {
                  updateData.courseEnd = moment.utc(e.target.courseEnd.value).startOf('day');
                } catch (err) {
                  console.error('Invalid date format');
                }
              }

              if (
                updateData.enrolmentStart !== null &&
                updateData.enrolmentEnd !== null &&
                updateData.enrolmentStart.isAfter(updateData.enrolmentEnd)
              ) {
                updateData.enrolmentEnd = updateData.enrolmentStart.clone().startOf('day');
              }

              if (
                updateData.courseStart !== null &&
                updateData.courseEnd !== null &&
                updateData.courseStart.isAfter(updateData.courseEnd)
              ) {
                updateData.courseEnd = updateData.courseStart.clone().startOf('day');
              }

              console.error(updateData);

              actions.courseUpdate(match.params.id, updateData).then((updateResult) => {
                actions.courseFetchSingle(match.params.id);
              });
            }}
          />
        </>
      );
    }

    return <>{content}</>;
  }
}

EditCourse.propTypes = {
  actions: PropTypes.shape({
    courseFetchSingle: PropTypes.func.isRequired,
    courseUpdate: PropTypes.func.isRequired,
  }).isRequired,
  course: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const EditCourseWithRouter = withRouter(EditCourse);

export default EditCourseWithRouter;
