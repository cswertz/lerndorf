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

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

class EnroleCourses extends Component {
  componentDidMount() {
    const { actions, match } = this.props;
    this.fetchData();
  }

  componentDidUpdate() {
    const { actions, match } = this.props;
  }

  fetchData() {
    const { actions, history } = this.props;
    actions.coursesFetchMyPossible().catch((err) => {
      if (err.cause === 403) {
        history.push('/errors/403');
      } else if (err.cause === 401) {
        history.push('/errors/401');
      }
    });
  }

  render() {
    const { user, courses, actions } = this.props;

    let enroleableCourses = [];

    if (courses.items?.length > 0) {
      enroleableCourses = courses.items.map((row) => (
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {row.shortTitle && row.shortTitle.length > 0 ? row.shortTitle : row.title}
          </TableCell>
          <TableCell align="left">...</TableCell>
          <TableCell align="left">{row.trainerName}</TableCell>
          <TableCell align="right">
            <IconButton aria-label="Start" component={Link}>
              <PlayArrow />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <>
        <Typography variant="h1">Enrole to Course</Typography>
        <TableContainer>
          <Table aria-label="Enrole to courses">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Trainer</strong>
                </TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>{enroleableCourses}</TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

EnroleCourses.propTypes = {
  actions: PropTypes.shape({
    coursesFetchMy: PropTypes.func.isRequired,
    coursesFetchMyPossible: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const EnroleCoursesWithRouter = withRouter(EnroleCourses);

export default EnroleCoursesWithRouter;
