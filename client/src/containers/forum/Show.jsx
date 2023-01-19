import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Show from '@components/forum/Show';

class ForumThread extends Component {
  constructor(props) {
    super(props);
    this.handleAddPost = this.handleAddPost.bind(this);
  }

  componentDidMount() {
    const { actions, match, thread } = this.props;
    if (match.params.id === 'create') {
      return;
    }
    this.fetchData();
  }

  componentDidUpdate() {
    const { actions, match, thread, history } = this.props;
    if (match.params.id === 'create') {
      return;
    }
    if (!thread?.item) {
      this.fetchData();
    }
  }

  fetchData() {
    const { actions, match, thread, history } = this.props;
    actions.forumThreadFetch(match?.params?.id).catch((err) => {
      if (err.cause === 403) {
        history.push('/errors/403');
      } else if (err.cause === 401) {
        history.push('/errors/401');
      }
    });
  }

  handleAddPost(e, data) {
    const { history, actions, match } = this.props;
    e.preventDefault();
    actions
      .forumThreadFetchAddAnswer(match?.params?.id, data, history)
      .then((result) => {
        console.warn(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { user, thread, actions } = this.props;
    return (
      <>
        {thread && thread.fetched && (
          <Show user={user} thread={thread.item} handleAddPost={this.handleAddPost} />
        )}
      </>
    );
  }
}

ForumThread.propTypes = {
  actions: PropTypes.shape({
    forumPublicThreadsFetch: PropTypes.func.isRequired,
    forumThreadFetch: PropTypes.func.isRequired,
    forumThreadFetchAddAnswer: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ForumThreadWithRouter = withRouter(ForumThread);

export default ForumThreadWithRouter;
