import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDateWithTime } from '@utils/date';
import { hasCapability } from '@utils/user';
import users from '@reducers/users';
import Post from './Post';

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

const ForumThead = ({ classes, user, thread, history }) => {
  return (
    <div>
      <div className="mediumMarginBottom">
        <Typography variant="h1" className={classes.subtitle}>
          {thread.summary ?? 'No thread found'}
        </Typography>
      </div>
      <div className="smallMargin">
        {thread.posts.map((post, index) => {
          return (
            <Post
              key={post.id}
              post={post}
              index={index}
              user={post.user}
              isLast={thread.posts.length - 1 === index}
            />
          );
        })}
      </div>
    </div>
  );
};

ForumThead.propTypes = {
  user: PropTypes.shape({}).isRequired,
  thread: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ForumThead);
