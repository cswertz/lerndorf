import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Show from '@components/forum/Show';

class ForumThread extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddPost = this.handleAddPost.bind(this);
  }

  componentDidMount() {
    this.fetchData();
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
        {thread.fetched && (
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
