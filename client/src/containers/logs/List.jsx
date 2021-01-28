import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
      logsFetch();
    }

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  handleFilterUpdate(e) {
    e.preventDefault();
    const filters = {
      userId: parseInt(e.target.userId.value) || null,
    }
    console.log('Filter update', filters);
  }

  handleDownload() {
    console.log('Trigger download');
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
