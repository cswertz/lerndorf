import {
  withRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Appbar from './containers/Appbar';
import Home from './components/Home';

import RoutesTaxonomies from './containers/routes/taxonomies';
import RoutesLanguages from './containers/routes/languages';
import RoutesUsers from './containers/routes/users';

import * as AppActions from './actions';

const Router = ({
  capabilities,
  taxonomies,
  languages,
  actions,
  roles,
  users,
  user,
}) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <div className="RegisterWrapper">
          <Appbar
            title="Home"
            active="home"
            user={user}
            logout={actions.userLogout}
          />
          <Home
            loggedIn={user.loggedIn}
          />
        </div>
      )}
    />

    <Route
      path="/languages"
      render={() => (
        <RoutesLanguages
          languages={languages}
          actions={actions}
          user={user}
        />
      )}
    />

    <Route
      path="/taxonomies"
      render={() => (
        <RoutesTaxonomies
          taxonomies={taxonomies}
          actions={actions}
          user={user}
        />
      )}
    />

    <Route
      path="/users"
      render={() => (
        <RoutesUsers
          capabilities={capabilities}
          actions={actions}
          roles={roles}
          users={users}
          user={user}
        />
      )}
    />

    <Redirect to="/" />
  </Switch>
);

Router.propTypes = {
  capabilities: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  taxonomies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  languages: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    removeRole: PropTypes.func.isRequired,
    addRole: PropTypes.func.isRequired,
    removeCapability: PropTypes.func.isRequired,
    addCapability: PropTypes.func.isRequired,
    languagesDelete: PropTypes.func.isRequired,
    languagesFetch: PropTypes.func.isRequired,
    languagesEdit: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
    taxonomiesItemFetch: PropTypes.func.isRequired,
    taxonomiesDelete: PropTypes.func.isRequired,
    taxonomiesFetch: PropTypes.func.isRequired,
    taxonomiesEdit: PropTypes.func.isRequired,
    taxonomiesAdd: PropTypes.func.isRequired,
    rolesItemFetch: PropTypes.func.isRequired,
    rolesDelete: PropTypes.func.isRequired,
    rolesFetch: PropTypes.func.isRequired,
    rolesEdit: PropTypes.func.isRequired,
    rolesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  }).isRequired,
  roles: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  users: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
      login: PropTypes.shape({}).isRequired,
      edit: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  capabilities: state.capabilities,
  taxonomies: state.taxonomies,
  languages: state.languages,
  roles: state.roles,
  users: state.users,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router));
