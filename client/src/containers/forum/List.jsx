import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import List from '@components/forum/List';

class Forum extends Component {
  componentDidMount() {
    this.fetchData();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate() {}

  fetchData() {
    const { actions, match, items } = this.props;
    if (items?.items.length > 0) {
      return;
    }
    actions.forumPublicThreadsFetch();
  }

  handleDelete(id) {
    const { handleDelete, history } = this.props;

    handleDelete(id, history);
  }

  render() {
    const { user, items, history, actions } = this.props;

    return (
      <>
        <List
          user={user}
          posts={items?.items ?? []}
          onDeleteConfirm={(id) => {
            actions.forumThreadDelete(id, history).then((result) => {
              history.go(0);
            });
          }}
        />
      </>
    );
  }
}

Forum.propTypes = {
  actions: PropTypes.shape({
    forumPublicThreadsFetch: PropTypes.func.isRequired,
    forumThreadFetch: PropTypes.func.isRequired,
    forumThreadDelete: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ForumWithRouter = withRouter(Forum);

export default ForumWithRouter;
