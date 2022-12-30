import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Avatar, Grid, Divider } from '@material-ui/core/index';
import { formatDateWithTime } from '@utils/date';
import sanitizeHtml from '../../../node_modules/sanitize-html-react/index';

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

const ForumTheadPost = ({ classes, user, post, index, isLast, history }) => {
  return (
    <div className={classes.gird} key={index}>
      <Grid container spacing={1}>
        <Grid item sm={1}>
          <Avatar>{post.user.username.substr(0, 1).toUpperCase()}</Avatar>
        </Grid>
        <Grid styles={{ padding: 10 }} item sm={11}>
          <div className="small smallMargin">
            {' '}
            {post?.user.username} <span>wrote at</span> {formatDateWithTime(post?.createdAt)}
          </div>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post?.text) }} />
        </Grid>
      </Grid>
      {isLast === false && <Divider className="mediumMargin mediumMarginBottom" />}
    </div>
  );
};

ForumTheadPost.propTypes = {
  user: PropTypes.shape({}).isRequired,
  post: PropTypes.shape({}).isRequired,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ForumTheadPost);
