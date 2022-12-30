import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Show from '@components/forum/Show';

class ForumThread extends Component {
  componentDidMount() {
    this.fetchData();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate() {}

  fetchData() {
    const { actions, match, thread } = this.props;
    actions.forumThreadFetch(match?.params?.id);
  }

  handleDelete(id) {
    const { handleDelete, history } = this.props;

    handleDelete(id, history);
  }

  render() {
    const { user, thread } = this.props;
    return <>{thread.fetched && <Show user={user} thread={thread.item} />}</>;
  }
}

ForumThread.propTypes = {
  actions: PropTypes.shape({
    forumPublicThreadsFetch: PropTypes.func.isRequired,
    forumThreadFetch: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ForumThreadWithRouter = withRouter(ForumThread);

export default ForumThreadWithRouter;
