import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import ForumList from '../forum/List';
import ForumThread from '../forum/Show';
import ForumThreadCreate from '../forum/Create';
import ForumThreadEdit from '../forum/Edit';

const ForumRouter = ({ forum, thread, actions, user }) => (
  <>
    <Route
      exact
      path="/threads"
      render={() => <ForumList user={user} actions={actions} items={forum ?? []} />}
    />
    <Route
      exact
      path="/threads/:id"
      render={() => <ForumThread user={user} actions={actions} thread={thread ?? {}} />}
    />
    <Route
      exact
      path="/threads/create"
      render={() => <ForumThreadCreate user={user} actions={actions} />}
    />
    <Route
      exact
      path="/threads/:id/edit"
      render={() => <ForumThreadEdit user={user} actions={actions} thread={thread ?? {}} />}
    />
  </>
);

ForumRouter.propTypes = {
  actions: PropTypes.shape({
    forumPublicThreadsFetch: PropTypes.func.isRequired,
    forumThreadFetch: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
      login: PropTypes.shape({}).isRequired,
      edit: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default ForumRouter;
