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
  }

  componentDidMount() {
    const {
      logs,
      logsFetch,
    } = this.props;

    if (!logs.fetched && !logs.fetching) {
      logsFetch();
    }
  }

  componentDidUpdate() {
    const {
      logs,
      logsFetch,
    } = this.props;

    if (!logs.fetched && !logs.fetching) {
      logsFetch();
    }
  }

  render() {
    const {
      history,
      logs,
      user,
    } = this.props;

    return (
      <div>
        <List
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LogsWithRouter = withRouter(Logs);

export default LogsWithRouter;
