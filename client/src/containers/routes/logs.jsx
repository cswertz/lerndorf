import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';
import Logs from '../logs/List';

const LoggingRouter = ({
  actions,
  user,
  logs,
}) => (
  <>
    <Route
      exact
      path="/logs"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LogsWrapper"
          logout={actions.userLogout}
          active="logs"
          title="Logs"
          user={user}
          element={(
            <Logs
              logs={logs}
              logsFetch={actions.logsFetch}
            />
          )}
        />
      )}
    />
  </>
);

LoggingRouter.propTypes = {
  logs: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    userLogout: PropTypes.func.isRequired,
    logsFetch: PropTypes.func.isRequired,
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

export default LoggingRouter;
