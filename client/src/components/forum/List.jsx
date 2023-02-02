import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDateWithTime } from '@utils/date';
import { hasCapability } from '@utils/user';
import React from 'react';
import DeleteConfirm from './DeleteConfirm';
import { Avatar, Grid } from '../../../node_modules/@material-ui/core/index';
import { AddComment, PlusOneOutlined } from '../../../node_modules/@material-ui/icons/index';

const styles = () => ({
  listItem: {
    flex: 1,
  },
});

const ForumList = ({ classes, user, posts, history, onDeleteConfirm, course }) => {
  let threads = null;
  if (posts.length > 0) {
    threads = posts.map((item) => (
      <ListItem key={item.id} dense disableGutters divider>
        <ListItemText style={styles.listItem}>
          <Grid container spacing={0}>
            <Grid item sm={1}>
              <Avatar>{item.lastPostUser?.username.substr(0, 1).toUpperCase()}</Avatar>
            </Grid>
            <Grid styles={{ padding: 10 }} item sm={11}>
              <a href={`/threads/${item.id}/details`}>
                <strong>{item.summary}</strong>
              </a>
              <div>
                {formatDateWithTime(item.lastPostAt)}
                <span> from </span>
                <strong>{item.lastPostUser?.username}</strong>
              </div>
            </Grid>
          </Grid>
        </ListItemText>
        <ListItemSecondaryAction>
          {hasCapability(user.capabilities, ['edit_threads']) && (
            <IconButton aria-label="Edit" component={Link} to={`/threads/${item.id}/edit`}>
              <EditIcon />
            </IconButton>
          )}
          {!hasCapability(user.capabilities, ['edit_threads']) &&
            hasCapability(user.capabilities, ['edit_own_threads']) &&
            user.user.id === item.userId && (
              <IconButton aria-label="Edit" component={Link} to={`/threads/${item.id}/edit`}>
                <EditIcon />
              </IconButton>
            )}
          {hasCapability(user.capabilities, ['delete_threads']) && (
            <DeleteConfirm
              id={item.id}
              headline="Delete Thread?"
              message="Do you want to delete the thread? All related data will be deleted."
              onConfirm={(id) => {
                onDeleteConfirm(id);
              }}
            />
          )}
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  return (
    <div>
      <Typography variant="h1" className={classes.subtitle}>
        Forum {course}
        {hasCapability(user.capabilities, ['create_threads']) &&
          (course === null || course === undefined) && (
            <IconButton aria-label="Create" component={Link} to="/threads/create">
              <AddComment />
            </IconButton>
          )}
        {hasCapability(user.capabilities, ['create_threads']) && course?.id && (
          <IconButton
            aria-label="Create"
            component={Link}
            to={`/courses/${course.id}/forum/create`}
          >
            <AddComment />
          </IconButton>
        )}
      </Typography>
      {posts.length > 0 && <List dense={false}>{threads}</List>}
      {posts.length === 0 && <div>No threads created.</div>}
    </div>
  );
};

ForumList.propTypes = {
  user: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
};

export default withStyles(styles)(ForumList);
