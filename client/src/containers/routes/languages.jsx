import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import LanguagesEdit from '../languages/Edit';
import LanguagesAdd from '../languages/Add';
import Languages from '../languages/List';

import Appbar from '../Appbar';

const Router = ({
  languages,
  actions,
  user,
}) => (
  <React.Fragment>
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
  </React.Fragment>
);

Router.propTypes = {
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

export default Router;
