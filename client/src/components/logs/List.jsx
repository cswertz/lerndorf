import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';

import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({});

const LogsList = ({
  classes,
  history,
  logs,
}) => {
  let logItems = null;
  if (logs.length > 0) {
    logItems = logs.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.createdAt}</TableCell>
        <TableCell>{item.User.username}</TableCell>
        <TableCell>{item.KnowledgeUnitId}</TableCell>
        <TableCell>{item.LearningUnitId}</TableCell>
        <TableCell>{item.CourseId}</TableCell>
        <TableCell>{item.mode}</TableCell>
        <TableCell>{item.navigationTool}</TableCell>
      </TableRow>
    ));
  }

  return (
    <div>
      <div className={classes.filterWrapper}>
      </div>
      <Typography variant="h5" className={classes.title}>
        Filtered Log Messages
      </Typography>
      <Table>
        <TableHead>
          <TableCell>Date</TableCell>
          <TableCell>User Id</TableCell>
          <TableCell>KU Id</TableCell>
          <TableCell>LU Id</TableCell>
          <TableCell>Course Id</TableCell>
          <TableCell>Mode</TableCell>
          <TableCell>Navigation</TableCell>
        </TableHead>
        <TableBody>
          {logItems}
        </TableBody>
      </Table>
    </div>
  );
};

LogsList.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LogsList);
