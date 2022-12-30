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

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

const ForumList = ({ classes, user, posts, history }) => {
  let threads = null;
  if (posts.length > 0) {
    threads = posts.map((item) => (
      <ListItem key={item.id} dense disableGutters>
        <ListItemText>
          <div>
            <a href={`/threads/${item.id}`}>{item.summary}</a>
          </div>
          <div>{formatDateWithTime(item.updatedAt)}</div>
        </ListItemText>
      </ListItem>
    ));
  }

  return (
    <div>
      <Typography variant="subtitle1" className={classes.subtitle}>
        Forum
      </Typography>
      <List dense={false}>{threads}</List>
    </div>
  );
};

ForumList.propTypes = {
  user: PropTypes.shape({}).isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ForumList);
