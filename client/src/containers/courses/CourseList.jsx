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
import { PlayArrow, Assignment, Add, HourglassEmptySharp } from '@material-ui/icons/index';
import { Grid } from '@material-ui/core/index';
import DeleteCourse from '@components/courses/DeleteCourse';
import ListView from '@components/courses/ListView';

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

class CourseList extends Component {
  componentDidMount() {
    const { actions, match } = this.props;
    this.fetchData();
  }

  componentDidUpdate() {
    const { actions, match } = this.props;
  }

  fetchData() {
    const { actions, history, match } = this.props;
    actions.courseListFetch(match.params.id).catch((err) => {
      if (err.cause === 403) {
        history.push('/errors/403');
      } else if (err.cause === 401) {
        history.push('/errors/401');
      }
    });
  }

  render() {
    const { user, courselist, actions } = this.props;
    return (
      <>
        {courselist && courselist?.item && (
          <ListView
            headline={courselist?.item.title}
            hideAdd
            user={user}
            columns={['title']}
            rows={courselist?.item?.courses}
            actions={actions}
            fetchData={this.fetchData}
          />
        )}
      </>
    );
  }
}

CourseList.propTypes = {
  actions: PropTypes.shape({
    coursesFetchMy: PropTypes.func.isRequired,
    coursesFetchMyPossible: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const CourseListWithRouter = withRouter(CourseList);

export default CourseListWithRouter;
