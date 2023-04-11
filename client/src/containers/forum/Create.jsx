import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { hasCapability } from '@utils/user';
import Edit from '@components/forum/Edit';
import { Typography } from '@material-ui/core/index';

class ForumThreadCreate extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {
    const { history, actions, match, thread } = this.props;
    if (thread?.item?.id) {
      history.replace(`/threads/${thread.item.id}/details`);
    }
  }

  handleCreate(e, data) {
    const { history, actions, match, course } = this.props;
    e.preventDefault();

    if (course?.item?.id !== undefined) {
      data.courseId = course?.item?.id;
    }

    actions
      .forumThreadCreate(data, history)
      .then((result) => {
        if (result === undefined) {
          return;
        }
        history.replace(`/threads/${result?.id}/details`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { user, actions } = this.props;
    return (
      <>
        <Typography variant="h1">Create new thread</Typography>
        <Edit user={user} thread={null} handleUpdate={this.handleCreate} />
      </>
    );
  }
}

ForumThreadCreate.propTypes = {
  actions: PropTypes.shape({
    forumThreadFetch: PropTypes.func.isRequired,
    forumThreadCreate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const ForumThreadCreateWithRouter = withRouter(ForumThreadCreate);

export default ForumThreadCreateWithRouter;
