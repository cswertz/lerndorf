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

const CourseContent = (props) => {
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
      (course?.content ?? []).map((contentEntry) => {
        return {
          id: contentEntry.id,
        };
      }),
    );
  }, [course, course.users]);

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
              <TableCell />
              <TableHeadCell
                label="Learning Unit"
                name="learningUnit"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="Knowledge Unit"
                name="knowledgeUnit"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="Media Type"
                name="mediaType"
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableHeadCell
                label="Version"
                name="version"
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
                    <TableCell>{row.learningUnit ?? 'n/a'}</TableCell>
                    <TableCell>{row.knowledgeUnit ?? 'n/a'}</TableCell>
                    <TableCell>{row.mediaType ?? 'n/a'}</TableCell>
                    <TableCell>{row.version ?? 'n/a'}</TableCell>
                    <TableCell align="right">
                      <span>test</span>
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

export default withStyles(styles)(CourseContent);
