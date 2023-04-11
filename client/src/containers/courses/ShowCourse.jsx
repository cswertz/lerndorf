import { withRouter, Link } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
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
import Show from '@components/courses/Show';

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
    if (
      isNaN(match.params.id) === false &&
      (course?.item === null ||
        (course?.item.id !== parseInt(match.params.id, 10) && course.fetched === false))
    ) {
      this.fetchData();
    }
  }

  fetchData() {
    const { actions, history, match } = this.props;
    actions.languagesFetch();
    actions.rolesFetch();
    if (isNaN(parseInt(match.params.id, 10))) {
      return;
    }
    actions.courseFetchSingle(match.params.id).catch((err) => {
      history.push('/courses/my');
    });
  }

  render() {
    const { user, courses, course, languages, actions, history, match, state, roles } = this.props;

    let content = null;

    if (course?.fetched && course?.item?.id === parseInt(match.params.id, 10)) {
      content = (
        <>
          <Typography variant="h1">{course?.item.title}</Typography>
          <Show
            user={user}
            actions={actions}
            roles={roles}
            languages={languages?.languages ?? []}
            course={course}
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
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const EditCourseWithRouter = withRouter(EditCourse);

export default EditCourseWithRouter;
