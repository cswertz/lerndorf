import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Add,
  CheckBox,
  NavigateBefore,
  NavigateNext,
  ArrowDownward,
  ArrowUpward,
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

function AddSequenceToCourse(props) {
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
    initialValues,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [rowsFiltered, setRowsFiltered] = React.useState([]);
  const [headline, setHeadline] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [hasError, setHasError] = React.useState(null);
  const [mode, setMode] = React.useState('confirm');
  const [okBtn, setOkBtn] = React.useState('Add sequence to course');
  const [cancelBtn, setCancelBtn] = React.useState('Cancel');

  const [formState, setFormState] = React.useState({});

  const [leftList, setLeftList] = React.useState([]);
  const [leftSelection, setLeftSelection] = React.useState([]);
  const [rightSelection, setRightSelection] = React.useState([]);
  const [courseContent, setCourseContent] = React.useState([]);

  const openDialog = () => {
    if (initialValues === undefined || initialValues === null) {
      setFormState({});
      setLeftList([]);
      setLeftSelection([]);
      setRightSelection([]);
    }
    setOpen(true);
  };

  const handleClose = (confirmResult) => {
    formState.list = leftList;
    setFormState(formState);
    if (handleSubmit) {
      handleSubmit(formState);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (okBtnText) {
      setOkBtn(okBtnText);
    }
  }, [okBtnText]);

  useEffect(() => {
    setCourseContent(
      (course?.content ?? []).map((contentEntry) => {
        const luTranslations = contentEntry.knowledgeUnit?.LearningUnit?.Translations;
        const preferredLanguage = user.user?.preferredLanguage;

        let translationLU = null;

        if (luTranslations) {
          luTranslations.forEach((translation) => {
            if (
              preferredLanguage !== null &&
              translationLU === null &&
              translation.LanguageId === preferredLanguage
            ) {
              translationLU = translation.title;
            } else if (
              preferredLanguage === null &&
              translationLU === null &&
              translation.LanguageId === course.mainLanguage
            ) {
              translationLU = translation.title;
            }
          });
        }

        if (contentEntry.knowledgeUnit) {
          const knowledgeTypeText = contentEntry.knowledgeUnit.kt
            ? term(contentEntry.knowledgeUnit.kt, preferredLanguage)
            : null;
          const mediaTypeText = contentEntry.knowledgeUnit.mt
            ? term(contentEntry.knowledgeUnit.mt, preferredLanguage)
            : null;

          const versions = contentEntry.knowledgeUnit.versions.filter(
            (versionEntry) => versionEntry.nextId === null,
          );

          const returnObject = {
            id: contentEntry.id,
            courseId: contentEntry.courseId,
            learningUnit: translationLU,
            knowledgeUnit: knowledgeTypeText,
            mediaType: mediaTypeText,
            version:
              versions.length === 0
                ? {
                    id: null,
                    text: 'Latest',
                  }
                : {
                    id: versions[0].id,
                    text: 'Update available',
                  },
          };

          return returnObject;
        }

        return null;
      }),
    );
  }, [course, course.users, course.content, user]);

  const isSelected = (selection, id) => selection.indexOf(id) !== -1;

  const handleClick = (e, side, selection, id) => {
    e.preventDefault();
    const list = [...selection];
    const indexInList = list.indexOf(id);
    if (indexInList > -1) {
      list.splice(indexInList, 1);
      if (side === 'right') {
        setRightSelection(list);
      } else {
        setLeftSelection(list);
      }
    } else {
      list.push(id);
      if (side === 'right') {
        setRightSelection(list);
      } else {
        setLeftSelection(list);
      }
    }
  };

  const addToLeftList = (e) => {
    e.preventDefault();
    const list = [...leftList].concat(rightSelection);
    setLeftList(list);
    setRightSelection([]);
  };

  const removeFromList = (e) => {
    e.preventDefault();
    const list = [...leftList];
    const newList = [];
    for (let i = 0; i < list.length; i += 1) {
      if (leftSelection.indexOf(i) === -1) {
        newList.push(list[i]);
      }
    }
    setLeftList(newList);
    setLeftSelection([]);
  };

  const moveUp = (e, index) => {
    e.preventDefault();
    const list = [...leftList];
    const value = list[index];
    if (index - 1 >= 0) {
      list.splice(index, 1);
      list.splice(index - 1, 0, value);
    }
    setLeftList(list);
  };

  const moveDown = (e, index) => {
    e.preventDefault();
    const list = [...leftList];
    const value = list[index];
    if (index + 1 >= list.length - 1) {
      list.splice(index, 1);
      list.splice(index + 1, 0, value);
    }
    setLeftList(list);
  };

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={12} sm={12}>
                <FormControl style={{ width: 'calc(100% - 30px)', margin: '0 15px' }}>
                  <Field
                    required
                    name="name"
                    label="Name of micromodel"
                    helperText="Define the name for the micromodel"
                    component={renderTextField}
                    onChange={(e) => {
                      setFormState(Object.assign(formState, { name: e.target.value }));
                      console.error(formState);
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 1fr',
                gridGap: '10px',
                margin: '20px 0',
              }}
            >
              <div
                style={{
                  border: '1px solid #DDD',
                }}
              >
                <Table>
                  <TableBody>
                    {leftList.map((id, index) => {
                      const isItemSelected = isSelected(leftSelection, index);
                      const item = courseContent.filter((content) => content.id === id)[0];
                      return (
                        <TableRow
                          // eslint-disable-next-line
                          key={`left-row-${index}`}
                          scope={item}
                          selected={isItemSelected}
                          role="checkbox"
                          style={{ cursor: 'pointer', height: '30px' }}
                        >
                          <TableCell
                            onClick={(event) => handleClick(event, 'left', leftSelection, index)}
                          >
                            {item.learningUnit}/{item.knowledgeUnit}/{item.mediaType}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                moveUp(e, index);
                              }}
                              style={{ padding: '2px' }}
                            >
                              <ArrowUpward />
                            </IconButton>
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                moveDown(e, index);
                              }}
                              style={{ padding: '2px' }}
                            >
                              <ArrowDownward />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              <div
                style={{
                  display: 'grid',
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                <IconButton onClick={addToLeftList}>
                  <NavigateBefore />
                </IconButton>
                <IconButton onClick={removeFromList}>
                  <NavigateNext />
                </IconButton>
              </div>
              <div
                style={{
                  border: '1px solid #DDD',
                }}
              >
                <Table>
                  <TableBody>
                    {courseContent.map((content) => {
                      const isItemSelected = isSelected(rightSelection, content.id);
                      return (
                        <TableRow
                          key={`right-row-${content.id}`}
                          scope={content}
                          selected={isItemSelected}
                          onClick={(event) =>
                            handleClick(event, 'right', rightSelection, content.id)
                          }
                          role="checkbox"
                          style={{ cursor: 'pointer', height: '60px' }}
                        >
                          <TableCell style={{ height: '60px' }}>
                            {content.learningUnit}/{content.knowledgeUnit}/{content.mediaType}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
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

AddSequenceToCourse.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const AddSequenceToCourseForms = reduxForm({
  form: 'AddSequence',
})(AddSequenceToCourse);

export default withStyles({})(AddSequenceToCourseForms);
