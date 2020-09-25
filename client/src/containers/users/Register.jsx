import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RegisterForm from '../../components/users/RegisterForm';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      handleSubmit,
      history,
    } = this.props;

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const {
      errors,
    } = this.props;

    return (
      <RegisterForm
        errors={errors.registration}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const RegisterWithRouter = withRouter(Register);

export default RegisterWithRouter;
