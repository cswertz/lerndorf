import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import RegisterForm from '../../components/users/RegisterForm';

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
      titlePrefix: e.target.titlePrefix.value,
      titleSuffix: e.target.titleSuffix.value,
      description: e.target.description.value,
      firstName: e.target.firstName.value,
      birthdate: e.target.birthdate.value,
      username: e.target.username.value,
      lastName: e.target.lastName.value,
      password: e.target.password.value,
      studyId: e.target.studyId.value,
      country: e.target.country.value,
      website: e.target.website.value,
      picture: e.target.picture.value,
      street: e.target.street.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      city: e.target.city.value,
      zip: e.target.zip.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const {
      errors,
      classes,
    } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={classes.container}>
          <RegisterForm
            errors={errors.registration}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const RegisterWithRouter = withRouter(Register);

export default withStyles(styles)(RegisterWithRouter);
