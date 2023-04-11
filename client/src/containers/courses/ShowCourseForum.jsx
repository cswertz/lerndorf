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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { PlayArrow, Assignment, Add, AddComment } from '@material-ui/icons/index';
import { Grid } from '@material-ui/core/index';
import Show from '@components/courses/Show';
import List from '@components/forum/List';

const moment = require('moment');

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

class ShowCourseForum extends Component {
  componentDidMount() {
    this.fetchData();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate() {}

  fetchData() {
    const { actions, match, items, course, user } = this.props;
    actions.courseFetchSingle(match.params.id);
    actions.forumPublicThreadsFetchForCourse(match.params.id);
  }

  handleDelete(id) {
    const { handleDelete, history } = this.props;

    handleDelete(id, history);
  }

  render() {
    const { user, items, history, actions, course } = this.props;

    console.error('KU', course);

    return (
      <>
        <Typography variant="subtitle">{course ? course?.item?.title : 'n/A'} </Typography>
        <List
          user={user}
          posts={items?.items ?? []}
          course={course.item}
          onDeleteConfirm={(id) => {
            actions.forumThreadDelete(id, history).then((result) => {
              history.go(0);
            });
          }}
        />
        {hasCapability(user.capabilities, ['create_threads']) && course?.item.id && (
          <IconButton
            aria-label="Create"
            component={Link}
            to={`/courses/${course.item.id}/forum/create`}
          >
            <AddComment />
          </IconButton>
        )}
      </>
    );
  }
}

ShowCourseForum.propTypes = {
  actions: PropTypes.shape({
    courseFetchSingle: PropTypes.func.isRequired,
    courseUpdate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ShowCourseForumWithRouter = withRouter(ShowCourseForum);

export default ShowCourseForumWithRouter;
