import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  PlayArrow,
  Assignment,
  Add,
  HourglassEmptySharp,
  CheckBox,
} from '@material-ui/icons/index';
import { Field, reduxForm } from 'redux-form';
import { renderSelect, renderTextField } from '@utils/forms';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHeadCell from '@components/tables/TableHeadCell';
import { getComparator, stableSort } from '@utils/table';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
} from '../../../node_modules/@material-ui/core/index';

function AddUserToCourse(props) {
  const {
    actions,
    course,
    courseUser,
    onConfirm,
    okBtnText,
    history,
    fetch,
    roles,
    handleSubmit,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [usersFiltered, setUsersFiltered] = React.useState([]);
  const [rolesFiltered, setRolesFiltered] = React.useState([]);
  const [userRole, setUserRole] = React.useState(9);
  const [headline, setHeadline] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [mode, setMode] = React.useState('confirm');
  const [okBtn, setOkBtn] = React.useState('Add user');
  const [cancelBtn, setCancelBtn] = React.useState('Cancel');

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    const rolesFilteredList = roles.items
      .filter((role) => ['tutor', 'learner', 'trainer'].indexOf(role.slug) > -1)
      .map((item) => {
        return {
          value: item.id,
          label: item.name,
          id: `role-${item.id}`,
        };
      });

    setRolesFiltered(rolesFilteredList);
  }, [roles]);

  useEffect(() => {
    rolesFiltered.forEach((role) => {
      if (role.slug === 'learner') {
        setUserRole(role.id);
      }
    });
  }, [rolesFiltered]);

  const openUserDialog = () => {
    setSelected([]);
    actions.usersFetch().then((userEntries) => {
      userEntries = userEntries.map((userEntry) => {
        userEntry.name = userEntry.username;
        if (userEntry.firstName !== null || userEntry.lastName !== null) {
          userEntry.name = `${userEntry.firstName ?? ''} ${userEntry.lastName ?? ''}`;
        }
        return userEntry;
      });

      setUsers(userEntries);
      setUsersFiltered(userEntries);
    });
    setOpen(true);
  };

  const handleDeleteResponse = (text) => {
    setMode('alert');
    setOpen(true);
    setMessage(text);
    if (fetch) {
      fetch();
    }
  };

  const handleClose = (confirmResult) => {
    if (mode === 'confirm' && confirmResult === true) {
      // Trigger the delete, cause it is confirmed.
      if (handleSubmit && selected.length > 0) {
        handleSubmit(selected[0], userRole);
      }
      if (selected.length > 0) {
        setOpen(false);
      }
    } else if (mode === 'confirm' && confirmResult === false) {
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [id];
    }

    setSelected(newSelected);

    usersFiltered.forEach((role) => {
      if (role.slug === 'learner') {
        userRole({ value: role.id, label: role.name, id: role.id });
      }
    });
  };

  useEffect(() => {
    if (okBtnText) {
      setOkBtn(okBtnText);
    }
  }, [okBtnText]);

  return (
    <>
      <IconButton aria-label="Delete course" onClick={openUserDialog}>
        <Add />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{headline}</DialogTitle>
        <DialogContent>
          <form>
            <FormControl>
              <Field
                required
                name="search"
                label="Search for a user"
                helperText="Enter a search term for the user"
                component={renderTextField}
                onChange={(e) => {
                  const filteredEntries = users
                    .map((userEntry) => {
                      if (
                        userEntry.name?.indexOf(e.target.value) > -1 ||
                        userEntry.city?.indexOf(e.target.value) > -1 ||
                        userEntry.country?.indexOf(e.target.value) > -1
                      ) {
                        return userEntry;
                      }
                      return null;
                    })
                    .filter((item) => item !== null);

                  setUsersFiltered(filteredEntries);
                }}
              />
            </FormControl>
            <TableContainer
              style={{ maxHeight: 400, width: '100%', border: '1px solid #ddd', marginTop: '10px' }}
            >
              <Table
                aria-label="Userlist"
                stickyHeader
                style={{ maxHeight: 300, minWidth: '480px' }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableHeadCell
                      label="Name"
                      name="name"
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
                      label="Student Id"
                      name="studyId"
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    <TableHeadCell
                      label="City"
                      name="city"
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                    <TableHeadCell
                      label="Country"
                      name="country"
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersFiltered.length > 0 &&
                    stableSort(usersFiltered, getComparator(order, orderBy)).map((row) => {
                      const isItemSelected = isSelected(row.id);

                      return (
                        <TableRow
                          key={`row-${row.id}`}
                          scope={row}
                          selected={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          style={{ cursor: 'pointer', height: '30px' }}
                        >
                          <TableCell>
                            {row.picture ? (
                              <Avatar src={`/uploads/${row.picture}`} alt={row.username} />
                            ) : (
                              <Avatar alt={row.username} />
                            )}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.email ?? 'n/a'}</TableCell>
                          <TableCell>{row.studyId ?? 'n/a'}</TableCell>
                          <TableCell>{row.city ?? 'n/a'}</TableCell>
                          <TableCell>{row.country ?? 'n/a'}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <FormControl required style={{ width: '100%', margin: '20px 0' }}>
              <Select
                name="role"
                label="User role"
                value={userRole}
                onChange={(e) => {
                  setUserRole(e.target.value);
                }}
              >
                {rolesFiltered.length > 0 &&
                  rolesFiltered.map((role) => {
                    return <MenuItem value={role.value}>{role.label}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(false);
            }}
            color="primary"
            autoFocus
          >
            {cancelBtn}
          </Button>
          <Button
            onClick={() => {
              handleClose(true);
            }}
            color="primary"
            autoFocus
          >
            {okBtn}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AddUserToCourse.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const AddUserToCourseForms = reduxForm({
  form: 'AddUser',
})(AddUserToCourse);

export default withStyles({})(AddUserToCourseForms);
