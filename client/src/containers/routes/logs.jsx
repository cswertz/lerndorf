import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from '@components/UI/Wrapper';
import Logs from '../logs/List';

const LoggingRouter = ({ learningUnits, languages, actions, logs }) => (
  <>
    <Route
      exact
      path="/logs"
      render={() => (
        <Wrapper className="LogsWrapper" active="logs" title="Logs">
          <Logs
            logs={logs}
            logsFetch={actions.logsFetch}
            logsDownload={actions.logsDownload}
            languages={languages}
            languagesFetch={actions.languagesFetch}
            suggestions={learningUnits.suggestions}
            fetchSuggestions={actions.learningUnitsSuggestionsFetch}
          />
        </Wrapper>
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
