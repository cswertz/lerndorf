import React, { useCallback, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import { getComparator, stableSort } from '@utils/table';
import TableHeadCell from '@components/tables/TableHeadCell';
import DeleteCourseUser from './DeleteCourseUser';

const CourseUsers = (props) => {
  const {
    actions,
    course,
    onConfirm,
    okBtnText,
    history,
    classes,
    showConfirmation,
    match,
    user,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [headline, setHeadline] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [okBtn, setOkBtn] = React.useState('OK');

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('lastName');

  const [rows, setRows] = React.useState([]);

  const adminUsers = course.users
    .map((userEntry) => {
      if (userEntry.role.slug === 'admin' || userEntry.role.slug === 'trainer') {
        return userEntry.userId;
      }
      return null;
    })
    .filter((id) => id !== null);

  useEffect(() => {
    setRows(
      course.users.map((userEntry) => {
        return {
          id: userEntry.id,
          courseId: userEntry.courseId,
          userId: userEntry.userId,
          firstName: userEntry.user.firstName,
          lastName: userEntry.user.lastName,
          email: userEntry.user.email,
          role: userEntry.role.name,
          roleSlug: userEntry.role.slug,
          enrolmentConfirmation: userEntry.enrolmentConfirmation,
          picture: userEntry.user.picture,
        };
      }),
    );
  }, [course, course.users]);

  const toggleConfirmation = (row) => {
    actions
      .courseUpdateUserConfirmation(row.courseId, row.id, !row.enrolmentConfirmation)
      .then((result) => {
        setTimeout(() => {
          actions.courseFetchSingle(row.courseId);
        }, 100);
      })
      .catch((err) => {
        setTimeout(() => {
          actions.courseFetchSingle(row.courseId);
        }, 100);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClose = () => {
    setOpen(false);
    if (hasError === false) {
      history.push(`/courses/${course.id}`);
    }
  };

  useEffect(() => {
    if (okBtnText) {
      setOkBtn(okBtnText);
    }
  }, [okBtnText]);

  return (
    <div className={classes.wrapper}>
      <TableContainer>
        <Table aria-label="Course users">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableHeadCell
                label="First name"
                name="firstName"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="Last name"
                name="lastName"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="E-Mail"
                name="email"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="Role"
                name="role"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="Last access"
                name="last_access"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              {showConfirmation && (
                <TableHeadCell
                  label="Accepted"
                  name="enrolmentConfirmation"
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
              )}
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              stableSort(rows, getComparator(order, orderBy)).map((row) => {
                return (
                  <TableRow key={`row-${row.id}`}>
                    <TableCell>
                      {row.picture ? (
                        <Avatar src={`/uploads/${row.picture}`} alt={row.username} />
                      ) : (
                        <Avatar alt={row.username} />
                      )}
                    </TableCell>
                    <TableCell>{row.firstName ?? 'n/a'}</TableCell>
                    <TableCell>{row.lastName ?? 'n/a'}</TableCell>
                    <TableCell>{row.email ?? 'n/a'}</TableCell>
                    <TableCell>{row.role ?? 'n/a'}</TableCell>
                    <TableCell>{row.last_access ?? 'n/a'}</TableCell>
                    {showConfirmation && (
                      <TableCell>
                        <Switch
                          defaultChecked={row.enrolmentConfirmation}
                          onChange={() => {
                            toggleConfirmation(row);
                          }}
                        />
                      </TableCell>
                    )}
                    <TableCell align="right">
                      {((adminUsers.indexOf(user.user?.id) > -1 && adminUsers.length > 1) ||
                        row?.roleSlug !== 'trainer') && (
                        <DeleteCourseUser
                          courseUser={row}
                          course={course}
                          actions={actions}
                          user={user.user}
                          fetch={() => {
                            actions.courseFetchSingle(course.id);
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid xs={12} container spacing={2}>
        <Grid xs={12} md={6} spacing={2} />
        <Grid xs={12} md={6} spacing={2} align="right" />
      </Grid>
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
  },
};

const useStyles = makeStyles((theme) => styles);

export default withStyles(styles)(CourseUsers);
