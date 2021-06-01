import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserLanguage from '../users/Language';
import UsersEdit from '../users/AdminEdit';
import Activate from '../users/Activate';
import Register from '../users/Register';
import UserEdit from '../users/Edit';
import Login from '../users/Login';
import Users from '../users/List';

import RolesShow from '../users/roles/Show';
import RolesEdit from '../users/roles/Edit';
import RolesAdd from '../users/roles/Add';
import Roles from '../users/roles/List';

const UsersRouter = ({ capabilities, languages, actions, roles, users, user }) => (
  <>
    <Route
      exact
      path="/users"
      render={() => (
        <Users
          itemFetch={actions.usersItemFetch}
          itemsDelete={actions.usersDelete}
          itemsFetch={actions.usersFetch}
          items={users}
        />
      )}
    />

    <Route
      exact
      path="/users/register"
      render={() => <Register handleSubmit={actions.userRegister} errors={user.errors} />}
    />

    <Route
      exact
      path="/users/activate/:hash"
      render={() => (
        <Activate
          activate={actions.userActivate}
          activated={user.activated}
          errors={user.errors}
          active={user.active}
        />
      )}
    />

    <Route
      exact
      path="/users/login"
      render={() => <Login errors={user.errors} handleSubmit={actions.userLogin} />}
    />

    <Route
      exact
      path="/users/user/edit"
      render={() => (
        <UserEdit
          userDelete={actions.userDelete}
          handleSubmit={actions.userEdit}
          errors={user.errors}
          user={user.user}
        />
      )}
    />

    <Route
      exact
      path="/users/user/languages"
      render={() => (
        <UserLanguage
          errors={user.errors}
          user={user.user}
          languages={languages}
          languagesFetch={actions.languagesFetch}
          languageAdd={actions.userLanguageAdd}
          languageDelete={actions.userLanguageDelete}
          languagePreferred={actions.userLanguagePreferred}
        />
      )}
    />

    <Route
      exact
      path="/users/edit/:id"
      render={() => (
        <UsersEdit
          itemFetch={actions.usersItemFetch}
          handleSubmit={actions.usersEdit}
          rolesFetch={actions.rolesFetch}
          remove={actions.removeRole}
          add={actions.addRole}
          errors={user.errors}
          items={users}
          roles={roles}
        />
      )}
    />

    <Route
      exact
      path="/users/roles"
      render={() => (
        <Roles itemsDelete={actions.rolesDelete} itemsFetch={actions.rolesFetch} items={roles} />
      )}
    />

    <Route
      exact
      path="/users/roles/add"
      render={() => (
        <RolesAdd
          languagesFetch={actions.languagesFetch}
          handleSubmit={actions.rolesAdd}
          languages={languages}
          errors={roles.errors}
        />
      )}
    />

    <Route
      exact
      path="/users/roles/edit/:id"
      render={() => (
        <RolesEdit
          capabilitiesFetch={actions.capabilitiesFetch}
          removeCapability={actions.removeCapability}
          languagesFetch={actions.languagesFetch}
          addCapability={actions.addCapability}
          itemFetch={actions.rolesItemFetch}
          handleSubmit={actions.rolesEdit}
          capabilities={capabilities}
          errors={roles.errors}
          languages={languages}
          items={roles}
        />
      )}
    />

    <Route
      exact
      path="/users/roles/show/:id"
      render={() => <RolesShow itemFetch={actions.rolesItemFetch} items={roles} />}
    />
  </>
);

UsersRouter.propTypes = {
  languages: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  capabilities: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    languagesFetch: PropTypes.func.isRequired,
    userFetchRoles: PropTypes.func.isRequired,
    userLanguageAdd: PropTypes.func.isRequired,
    userLanguagePreferred: PropTypes.func.isRequired,
    usersItemFetch: PropTypes.func.isRequired,
    usersFetch: PropTypes.func.isRequired,
    removeCapability: PropTypes.func.isRequired,
    addCapability: PropTypes.func.isRequired,
    capabilitiesFetch: PropTypes.func.isRequired,
    rolesItemFetch: PropTypes.func.isRequired,
    rolesDelete: PropTypes.func.isRequired,
    rolesFetch: PropTypes.func.isRequired,
    rolesEdit: PropTypes.func.isRequired,
    rolesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    userDelete: PropTypes.func.isRequired,
    userEdit: PropTypes.func.isRequired,
    removeRole: PropTypes.func.isRequired,
    usersDelete: PropTypes.func.isRequired,
    usersEdit: PropTypes.func.isRequired,
    userActivate: PropTypes.func.isRequired,
    userLanguageDelete: PropTypes.func.isRequired,
    addRole: PropTypes.func.isRequired,
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
    activated: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UsersRouter;
