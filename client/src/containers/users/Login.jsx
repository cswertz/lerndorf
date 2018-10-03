import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// import LoginForm from '../../components/users/LoginForm';

import logo from '../../logo.svg';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class Login extends Component {
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
    };

    handleSubmit(data, history);
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={classes.container}>
          Login Placeholder.
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LoginWithRouter = withRouter(Login);

export default withStyles(styles)(LoginWithRouter);
