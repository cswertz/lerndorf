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
    const {
      logs,
      logsFetch,
      languages,
      languagesFetch,
    } = this.props;

    if (!logs.fetched && !logs.fetching) {
      logsFetch({});
    }

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  handleFilterUpdate(e) {
    e.preventDefault();
    const {
      logsFetch,
    } = this.props;

    const filters = {
      user_id: parseInt(e.target.userId.value, 10) || null,
      course_id: parseInt(e.target.courseId.value, 10) || null,
      learning_unit_id: parseInt(e.target.luId.value, 10) || null,
      knowledge_unit_id: parseInt(e.target.kuId.value, 10) || null,
      language_id: parseInt(e.target.language.value, 10) || null,
      date_from: e.target.dateFrom.value ? new Date(e.target.dateFrom.value).toISOString() : null,
      date_to: e.target.dateTo.value ? new Date(e.target.dateTo.value).toISOString() : null,
    };

    this.setState({
      filters,
    });

    logsFetch(filters);
  }

  handleDownload(e) {
    e.preventDefault();
    const {
      logsDownload,
    } = this.props;

    const { filters } = this.state;
    logsDownload(filters);
  }

  render() {
    const {
      languages,
      history,
      logs,
      user,
    } = this.props;

    return (
      <div>
        <List
          handleFilterUpdate={this.handleFilterUpdate}
          handleDownload={this.handleDownload}
          languages={languages}
          logs={logs.items}
          history={history}
          user={user}
        />
      </div>
    );
  }
}

Logs.propTypes = {
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
