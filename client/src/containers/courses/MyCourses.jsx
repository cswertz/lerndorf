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

class MyCourses extends Component {
  componentDidMount() {
    const { actions, match } = this.props;
    this.fetchData();
  }

  componentDidUpdate() {
    const { actions, match } = this.props;
  }

  fetchData() {
    const { actions, history } = this.props;
    actions.coursesFetchMy().catch((err) => {
      if (err.cause === 403) {
        history.push('/errors/403');
      } else if (err.cause === 401) {
        history.push('/errors/401');
      }
    });
  }

  render() {
    const { user, courses, actions } = this.props;

    let courseItems = [];
    if (courses.items?.length > 0) {
      courseItems = courses.items.map((row) => (
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {row.shortTitle && row.shortTitle.length > 0 ? row.shortTitle : row.title}
          </TableCell>
          <TableCell align="left">
            {row.users[0]?.roleTranslation ? row.users[0]?.roleTranslation.vocable : 'n/a'}
          </TableCell>
          <TableCell align="right">
            <IconButton aria-label="Start" component={Link}>
              <PlayArrow />
            </IconButton>
            {hasCapability(user.capabilities, ['edit_course']) && (
              <IconButton aria-label="Edit" component={Link}>
                <EditIcon />
              </IconButton>
            )}
            {hasCapability(user.capabilities, ['delete_course']) && (
              <IconButton aria-label="Edit" component={Link}>
                <DeleteIcon />
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ));
    }

    return (
      <>
        <Typography variant="h1">My Courses</Typography>
        <TableContainer>
          <Table aria-label="My courses">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell align="left">
                  <strong>Role</strong>
                </TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>{courseItems}</TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} spacing={2}>
            {hasCapability(user.capabilities, ['enrole_course']) && (
              <IconButton aria-label="Enrole" component={Link} to="/courses/enrole">
                <Assignment />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={12} md={6} spacing={2} align="right">
            {hasCapability(user.capabilities, ['create_course']) && (
              <IconButton aria-label="Create" component={Link} to="/courses/create">
                <Add />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

MyCourses.propTypes = {
  actions: PropTypes.shape({
    coursesFetchMy: PropTypes.func.isRequired,
    coursesFetchMyPossible: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const MyCoursesWithRouter = withRouter(MyCourses);

export default MyCoursesWithRouter;
