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
import { term } from '@utils/taxonomy';
import { IconButton } from '../../../node_modules/@material-ui/core/index';
import { CachedOutlined } from '../../../node_modules/@material-ui/icons/index';
import AddSequenceToCourse from './AddSequenceToCourse';
import DeleteCourseSequence from './DeleteCourseSequence';

const CourseSequences = (props) => {
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
      (course?.sequences ?? []).map((sequenceEntry) => {
        return {
          id: sequenceEntry.id,
          name: sequenceEntry.microModel,
          list: sequenceEntry.units
            .sort((a, b) => {
              if (a.orderId < b.orderId) return -1;
              if (a.orderId > b.orderId) return 1;
              return 0;
            })
            .map((item) => item.knowledgeUnitId),
        };
      }),
    );
  }, [course, course.users, course.content, user]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
              <TableHeadCell
                label="Name"
                name="name"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              stableSort(rows, getComparator(order, orderBy)).map((row) => {
                return (
                  <TableRow key={`row-${row.id}`}>
                    <TableCell>{row.name ?? 'n/a'}</TableCell>
                    <TableCell align="right">
                      {((adminUsers.indexOf(user.user?.id) > -1 && adminUsers.length > 1) ||
                        row?.roleSlug !== 'trainer') && (
                        <AddSequenceToCourse
                          key={`sequence-edit-${row.id}`}
                          user={user}
                          course={course}
                          actions={actions}
                          okBtnText="Update"
                          itemId={row.id}
                          itemName={row.name}
                          itemList={row.list}
                          initialValues={row}
                          handleSubmit={(sequenceDetail) => {
                            actions
                              .courseSequenceUpdate(
                                course.id,
                                row.id,
                                sequenceDetail.name,
                                sequenceDetail.list,
                              )
                              .then((result) => {
                                actions.courseFetchSingle(course.id);
                              });
                          }}
                        />
                      )}
                      {((adminUsers.indexOf(user.user?.id) > -1 && adminUsers.length > 1) ||
                        row?.roleSlug !== 'trainer') && (
                        <DeleteCourseSequence
                          sequence={row}
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
    </div>
  );
};

const styles = {
  wrapper: {
    width: '100%',
  },
};

const useStyles = makeStyles((theme) => styles);

export default withStyles(styles)(CourseSequences);
