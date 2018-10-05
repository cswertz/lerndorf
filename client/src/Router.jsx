import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LanguagesEdit from './containers/languages/Edit';
import LanguagesAdd from './containers/languages/Add';
import Languages from './containers/languages/List';

import Taxonomies from './containers/taxonomies/List';

import Register from './containers/users/Register';
import UserEdit from './containers/users/Edit';
import Login from './containers/users/Login';
import Appbar from './containers/Appbar';
import Home from './components/Home';

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
    <Route
      exact
      path="/register"
      render={() => (
        <div className="RegisterWrapper">
          <Appbar
            title="Register"
            active="register"
            user={user}
            logout={actions.userLogout}
          />
          <Register
            errors={user.errors}
            handleSubmit={actions.userRegister}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/login"
      render={() => (
        <div className="LoginWrapper">
          <Appbar
            title="Login"
            active="login"
            user={user}
            logout={actions.userLogout}
          />
          <Login
            errors={user.errors}
            handleSubmit={actions.userLogin}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/user/edit"
      render={() => (
        <div className="UserEditWrapper">
          <Appbar
            title="Edit your data"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <UserEdit
            errors={user.errors}
            handleSubmit={actions.userEdit}
            user={user.user}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/languages"
      render={() => (
        <div className="LanguagesWrapper">
          <Appbar
            title="Languages"
            active="languages"
            user={user}
            logout={actions.userLogout}
          />
          <Languages
            languagesDelete={actions.languagesDelete}
            languagesFetch={actions.languagesFetch}
            languages={languages}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/languages/add"
      render={() => (
        <div className="LanguagesWrapper">
          <Appbar
            title="Add Language"
            active="languages"
            user={user}
            logout={actions.userLogout}
          />
          <LanguagesAdd
            handleSubmit={actions.languagesAdd}
            errors={languages.errors}
          />
        </div>
      )}
    />
    <Route
      exact
      path="/languages/edit/:id"
      render={() => (
        <div className="LanguagesWrapper">
          <Appbar
            title="Edit Language"
            active="languages"
            user={user}
            logout={actions.userLogout}
          />
          <LanguagesEdit
            languagesFetch={actions.languagesFetch}
            handleSubmit={actions.languagesEdit}
            errors={languages.errors}
            languages={languages}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/taxonomies"
      render={() => (
        <div className="TaxonomiesWrapper">
          <Appbar
            title="Taxonomies"
            active="taxonomies"
            user={user}
            logout={actions.userLogout}
          />
          <Taxonomies
            itemsDelete={actions.taxonomiesDelete}
            itemsFetch={actions.taxonomiesFetch}
            items={taxonomies}
          />
        </div>
      )}
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
