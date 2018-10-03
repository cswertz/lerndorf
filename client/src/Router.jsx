import { Switch, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Register from './containers/users/Register';
import Home from './Home';

import * as AppActions from './actions';

const Router = ({
  actions,
  user,
}) => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/register"
      render={() => (
        <Register
          errors={user.errors}
          handleSubmit={actions.userRegister}
        />
      )}
    />
  </Switch>
);

Router.propTypes = {
  user: PropTypes.shape({
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    userRegister: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router);
