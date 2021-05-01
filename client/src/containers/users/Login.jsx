import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginForm from '@components/users/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { handleSubmit, history } = this.props;

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const { errors } = this.props;

    return <LoginForm errors={errors.login} handleSubmit={this.handleSubmit} />;
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginWithRouter = withRouter(Login);

export default LoginWithRouter;
