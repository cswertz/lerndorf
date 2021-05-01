import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '@components/routes/wrapper';

import LanguagesEdit from '../languages/Edit';
import LanguagesAdd from '../languages/Add';
import Languages from '../languages/List';

const LanguagesRouter = ({ languages, actions, user }) => (
  <>
    <Route
      exact
      path="/languages"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LanguagesWrapper"
          logout={actions.userLogout}
          active="languages"
          title="Languages"
          user={user}
          element={
            <Languages
              languagesDelete={actions.languagesDelete}
              languagesFetch={actions.languagesFetch}
              languages={languages}
            />
          }
        />
      )}
    />

    <Route
      exact
      path="/languages/add"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LanguagesWrapper"
          logout={actions.userLogout}
          title="Add Language"
          active="languages"
          user={user}
          element={<LanguagesAdd handleSubmit={actions.languagesAdd} errors={languages.errors} />}
        />
      )}
    />

    <Route
      exact
      path="/languages/edit/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LanguagesWrapper"
          logout={actions.userLogout}
          title="Edit Language"
          active="languages"
          user={user}
          element={
            <LanguagesEdit
              languagesFetch={actions.languagesFetch}
              handleSubmit={actions.languagesEdit}
              errors={languages.errors}
              languages={languages}
            />
          }
        />
      )}
    />
  </>
);

LanguagesRouter.propTypes = {
  languages: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    languagesDelete: PropTypes.func.isRequired,
    languagesFetch: PropTypes.func.isRequired,
    languagesEdit: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
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

export default LanguagesRouter;
