import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Add, CheckBox, CheckBoxOutlineBlankOutlined } from '@material-ui/icons/index';
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
import { term } from '@utils/taxonomy';
import {
  Avatar,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
} from '../../../node_modules/@material-ui/core/index';

function AddContentToCourse(props) {
  const {
    actions,
    course,
    courseUser,
    onConfirm,
    okBtnText,
    history,
    fetch,
    handleSubmit,
    user,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [rowsFiltered, setRowsFiltered] = React.useState([]);
  const [headline, setHeadline] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [mode, setMode] = React.useState('confirm');
  const [okBtn, setOkBtn] = React.useState('Add content to course');
  const [cancelBtn, setCancelBtn] = React.useState('Cancel');
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [selectedFilter, setSelectedFilter] = React.useState('all');

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const [selected, setSelected] = React.useState([]);

  const openDialog = () => {
    const preferredLanguage = user.user?.preferredLanguage;

    setSelected([]);
    actions.knowledgeUnitsFetch().then((contentEntries) => {
      contentEntries = contentEntries.map((entry) => {
        const knowledgeTypeText = entry.kt ? term(entry.kt, preferredLanguage) : null;
        const mediaTypeText = entry.mt ? term(entry.mt, preferredLanguage) : null;
        let learningUnitText = null;

        entry.LearningUnit.Translations.forEach((translation) => {
          if (
            learningUnitText === null &&
            (preferredLanguage === null || translation.LanguageId === preferredLanguage)
          ) {
            learningUnitText = translation.title;
          }
        });

        return {
          id: entry.id,
          knowledgeUnit: knowledgeTypeText,
          mediaType: mediaTypeText,
          learningUnit: learningUnitText,
          creator: entry.UserId,
          reviewed: entry.review,
          visibleCourses: entry.visibleCourses,
        };
      });

      setData(contentEntries);
      setRowsFiltered(contentEntries);
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
        handleSubmit(selected);
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
    const itemsSelected = [...selected];
    const selectedIndex = itemsSelected.indexOf(id);

    if (selectedIndex === -1) {
      itemsSelected.push(id);
    } else {
      itemsSelected.splice(selectedIndex, 1);
    }

    setSelected(itemsSelected);
  };

  useEffect(() => {
    if (okBtnText) {
      setOkBtn(okBtnText);
    }
  }, [okBtnText]);

  useEffect(() => {
    let filteredEntries = data
      .map((entry) => {
        if (
          searchTerm === null ||
          searchTerm === '' ||
          entry.learningUnit?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1 ||
          entry.knowledgeUnit?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1 ||
          entry.mediaType?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1
        ) {
          return entry;
        }
        return null;
      })
      .filter((item) => item !== null);

    if (selectedFilter === 'my') {
      filteredEntries = filteredEntries.filter((entry) => entry.creator === user.user.id);
    } else if (selectedFilter === 'reviewed') {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.visibleCourses === true && entry.reviewed === true,
      );
    } else {
      filteredEntries = filteredEntries.filter((entry) => entry.visibleCourses === true);
    }
    setRowsFiltered(filteredEntries);
  }, [searchTerm, selectedFilter]);

  return (
    <>
      <IconButton aria-label="Add content" onClick={openDialog}>
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
            <Grid container spacing={2}>
              <Grid xs={12} sm={4}>
                <FormControl style={{ width: 'calc(100% - 30px)', margin: '0 15px' }}>
                  <Field
                    required
                    name="search"
                    label="Search for a content"
                    helperText="Enter a search term for the content"
                    component={renderTextField}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={4}>
                <FormControl required style={{ width: '200px', margin: '16px 0' }}>
                  <Select
                    name="role"
                    label="User role"
                    value={selectedFilter}
                    onChange={(e) => {
                      setSelectedFilter(e.target.value);
                    }}
                  >
                    <MenuItem value="my">My content</MenuItem>
                    <MenuItem value="reviewed">Reviewed content</MenuItem>
                    <MenuItem value="all">All content</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TableContainer
              style={{ height: '80vh', width: '100%', border: '1px solid #ddd', marginTop: '20px' }}
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsFiltered.length > 0 &&
                    stableSort(rowsFiltered, getComparator(order, orderBy)).map((row) => {
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
                            {!isItemSelected ? <CheckBoxOutlineBlankOutlined /> : <CheckBox />}
                          </TableCell>
                          <TableCell>{row.learningUnit}</TableCell>
                          <TableCell>{row.knowledgeUnit ?? 'n/a'}</TableCell>
                          <TableCell>{row.mediaType ?? 'n/a'}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
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

AddContentToCourse.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const AddContentToCourseForms = reduxForm({
  form: 'AddContent',
})(AddContentToCourse);

export default withStyles({})(AddContentToCourseForms);
