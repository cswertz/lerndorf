import { withRouter, Link } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Show from '@components/forum/Show';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

const styles = {};

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

const ListView = ({ actions, rows, user, headline, fetchData, hideAdd, columns }) => {
  const classes = useStyles();
  let rowItems = [];

  if (columns === undefined) {
    columns = ['title', 'roles'];
  }

  if (rows !== null && rows !== undefined && rows.length > 0) {
    rowItems = rows.map((row) => (
      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          <Link to={`/courses/${row.id}`}>
            {row.shortTitle && row.shortTitle.length > 0 ? row.shortTitle : row.title}
          </Link>
        </TableCell>
        {columns.indexOf('roles') > -1 && (
          <TableCell align="left">{row?.currentUserRole}</TableCell>
        )}
        <TableCell align="right">
          {row?.playButtonState?.state === 'active' && (
            <IconButton
              aria-label="Start"
              onClick={() => {
                // eslint-disable-next-line
                alert('TBD: Unknown behavior');
              }}
            >
              <PlayArrow />
            </IconButton>
          )}
          {row?.playButtonState?.state === 'inactive' && (
            <IconButton aria-label="Start" title={row?.playButtonState?.msg}>
              <HourglassEmptySharp />
            </IconButton>
          )}
          {hasCapability(user.capabilities, ['edit_course']) &&
            row.currentUserIsTrainerOrTutor === true && (
              <IconButton aria-label="Edit" component={Link} to={`/courses/${row.id}/edit`}>
                <EditIcon />
              </IconButton>
            )}
          {(hasCapability(user.roles, ['admin']) ||
            (hasCapability(user.capabilities, ['delete_course']) &&
              user.user.id === row.trainerId)) && (
            <DeleteCourse
              user={user.user}
              course={row}
              actions={actions}
              fetch={() => {
                fetchData();
              }}
            />
          )}
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <>
      <Typography variant="h1">{headline}</Typography>
      <TableContainer>
        <Table aria-label={headline}>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              {columns.indexOf('roles') > -1 && (
                <TableCell align="left">
                  <strong>Role</strong>
                </TableCell>
              )}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>{rowItems}</TableBody>
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
        {hideAdd === false && (
          <Grid item xs={12} md={6} spacing={2} align="right">
            {hasCapability(user.capabilities, ['create_course']) && (
              <IconButton aria-label="Create" component={Link} to="/courses/create">
                <Add />
              </IconButton>
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
};

ListView.propTypes = {
  course: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ListView);
