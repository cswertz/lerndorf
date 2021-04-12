import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';
import Logs from '../logs/List';

const LoggingRouter = ({
  learningUnits,
  languages,
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
              logsDownload={actions.logsDownload}
              languages={languages}
              languagesFetch={actions.languagesFetch}
              suggestions={learningUnits.suggestions}
              fetchSuggestions={actions.learningUnitsSuggestionsFetch}
            />
          )}
        />
      )}
    />
  </>
);

LoggingRouter.propTypes = {
  learningUnits: PropTypes.shape({
    suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  languages: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  logs: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    learningUnitsSuggestionsFetch: PropTypes.func.isRequired,
    languagesFetch: PropTypes.func.isRequired,
    logsFetch: PropTypes.func.isRequired,
    logsDownload: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
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
