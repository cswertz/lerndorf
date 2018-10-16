import { Switch, Route, withRouter } from 'react-router-dom';
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
  taxonomies,
  languages,
  actions,
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

    <RoutesUsers
      actions={actions}
      user={user}
    />

    <RoutesLanguages
      languages={languages}
      actions={actions}
      user={user}
    />

    <RoutesTaxonomies
      taxonomies={taxonomies}
      actions={actions}
      user={user}
    />
  </Switch>
);

Router.propTypes = {
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
    languagesFetch: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
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
  user: state.user,
  languages: state.languages,
  taxonomies: state.taxonomies,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Router));
