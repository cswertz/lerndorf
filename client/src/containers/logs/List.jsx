import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../components/logs/List';
import { hasCapability } from '../../utils/user';

class Logs extends Component {
  constructor(props) {
    super(props);

    this.fetchItems = this.fetchItems.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this);

    this.state = {
      filters: {
        user_id: null,
        course_id: null,
        learning_unit_id: null,
        knowledge_unit_id: null,
        language_id: null,
        date_from: null,
        date_to: null,
      },
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentDidUpdate() {
    this.fetchItems();
  }

  fetchItems() {
    const { logs, logsFetch, languages, languagesFetch } = this.props;

    if (!logs.fetched && !logs.fetching) {
      logsFetch({});
    }

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  handleFilterUpdate(filters) {
    const { logsFetch } = this.props;

    this.setState({
      filters,
    });

    logsFetch(filters);
  }

  handleDownload(e) {
    e.preventDefault();
    const { logsDownload } = this.props;

    const { filters } = this.state;
    logsDownload(filters);
  }

  render() {
    const { languages, history, suggestions, fetchSuggestions, logs, user } = this.props;

    return (
      <div>
        <List
          handleFilterUpdate={this.handleFilterUpdate}
          handleDownload={this.handleDownload}
          languages={languages}
          suggestions={suggestions}
          fetchSuggestions={fetchSuggestions}
          logs={logs.items}
          history={history}
          user={user}
        />
      </div>
    );
  }
}

Logs.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  logsFetch: PropTypes.func.isRequired,
  logsDownload: PropTypes.func.isRequired,
  logs: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  languages: PropTypes.shape({}).isRequired,
  languagesFetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LogsWithRouter = withRouter(Logs);

export default LogsWithRouter;
