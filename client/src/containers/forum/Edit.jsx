import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Edit from '@components/forum/Edit';
import { Typography } from '@material-ui/core/index';

class ForumThreadEdit extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { actions, match, thread } = this.props;
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

  handleDelete(id) {
    const { handleDelete, history } = this.props;

    handleDelete(id, history);
  }

  handleUpdate(e, data) {
    const { history, actions, match } = this.props;
    e.preventDefault();
    actions
      .forumThreadUpdate(match?.params?.id, data, history)
      .then((result) => {
        history.push(`/threads/${match?.params?.id}/details`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { user, thread, actions, match } = this.props;
    return (
      <>
        <Typography variant="h1">Edit thread</Typography>

        {thread && thread.fetched && (
          <Edit user={user} thread={thread.item} handleUpdate={this.handleUpdate} />
        )}
      </>
    );
  }
}

ForumThreadEdit.propTypes = {
  actions: PropTypes.shape({
    forumThreadFetch: PropTypes.func.isRequired,
    forumThreadUpdate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ForumThreadEditWithRouter = withRouter(ForumThreadEdit);

export default ForumThreadEditWithRouter;
