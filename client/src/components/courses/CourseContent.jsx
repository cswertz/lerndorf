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
import DeleteCourseUser from './DeleteCourseUser';
import { IconButton } from '../../../node_modules/@material-ui/core/index';
import { CachedOutlined } from '../../../node_modules/@material-ui/icons/index';
import DeleteCourseContent from './DeleteCourseContent';

const CourseContent = (props) => {
  const { actions, course, onConfirm, okBtnText, history, classes, showConfirmation, match, user } =
    props;

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
                    <TableCell>
                      {row.version?.text ?? 'n/a'}
                      {row.version?.id !== null && (
                        <IconButton
                          onClick={() => {
                            actions
                              .courseFetchContentUpdate(row.courseId, row.id)
                              .then((result) => {
                                actions.courseFetchSingle(course.id);
                              });
                          }}
                        >
                          <CachedOutlined />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {((adminUsers.indexOf(user.user?.id) > -1 && adminUsers.length > 1) ||
                        row?.roleSlug !== 'trainer') && (
                        <DeleteCourseContent
                          content={row}
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

export default withStyles(styles)(CourseContent);
