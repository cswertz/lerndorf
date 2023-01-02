import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Edit from '@components/forum/Edit';

class ForumThreadCreate extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {
    const { actions, match, thread } = this.props;
  }

  handleCreate(e, data) {
    const { history, actions, match } = this.props;
    e.preventDefault();
    actions
      .forumThreadCreate(data, history)
      .then((result) => {
        console.error(result);
        history.push(`/threads/${result.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { user, actions } = this.props;
    return (
      <>
        <Edit user={user} thread={null} handleUpdate={this.handleCreate} />
      </>
    );
  }
}

ForumThreadCreate.propTypes = {
  actions: PropTypes.shape({
    forumThreadFetch: PropTypes.func.isRequired,
    forumThreadUpdate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ForumThreadCreateWithRouter = withRouter(ForumThreadCreate);

export default ForumThreadCreateWithRouter;
