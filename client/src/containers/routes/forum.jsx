import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import ForumList from '../forum/List';

const ForumRouter = ({ forum, actions, user }) => (
  <>
    <Route
      exact
      path="/forum"
      render={() => <ForumList user={user} actions={actions} items={forum ?? []} />}
    />
  </>
);

ForumRouter.propTypes = {
  actions: PropTypes.shape({
    forumPublicThreadsFetch: PropTypes.func.isRequired,
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
