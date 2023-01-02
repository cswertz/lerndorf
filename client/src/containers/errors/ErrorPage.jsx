import { withRouter } from 'react-router-dom';
import { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '../../../node_modules/@material-ui/core/index';

class ErrorPage extends Component {
  componentDidMount() {}

  render() {
    const { user, headline, text, actions } = this.props;
    return (
      <>
        <Typography variant="h1" className="">
          {headline}
        </Typography>
        <Typography variant="body1" className="">
          {text}
        </Typography>
      </>
    );
  }
}

ErrorPage.propTypes = {
  headline: PropTypes.string,
  text: PropTypes.string,
  user: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

ErrorPage.defaultProps = {
  headline: 'n/a',
  text: '',
};

const ErrorWithRouter = withRouter(ErrorPage);

export default ErrorWithRouter;
