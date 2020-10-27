import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Activate extends Component {
  /*
  constructor(props) {
    super(props);

    this.handleActivation = this.handleActivation.bind(this);
  }
  */

  componentDidMount() {
    const {
      activated,
      activate,
      active,
      match,
    } = this.props;
    const { hash } = match.params;

    if (!activated && !active) {
      activate(hash);
    }
  }

  render() {
    const {
      active,
      activated,
    } = this.props;

    let message = <div>Activating User...</div>;
    if (active && activated) {
      message = <div>Successfully activated user.</div>;
    }
    if (!active && activated) {
      message = <div>Could not activate user.</div>;
    }

    return (
      <div>
        <Typography variant="headline">
          Activation
        </Typography>
        {message}
      </div>
    );
  }
}

Activate.propTypes = {
  activated: PropTypes.bool.isRequired,
  activate: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      hash: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const ActivateWithRouter = withRouter(Activate);

export default ActivateWithRouter;
