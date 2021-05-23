import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';

import * as AppActions from '@actions';
import RoutesKnowledgeUnits from '@containers/routes/knowledgeUnits';
import RoutesLearningUnits from '@containers/routes/learningUnits';
import RoutesTaxonomies from '@containers/routes/taxonomies';
import RoutesLanguages from '@containers/routes/languages';
import RoutesUsers from '@containers/routes/users';
import RoutesTexts from '@containers/routes/texts';
import RoutesLogs from '@containers/routes/logs';
import Wrapper from '@components/UI/Wrapper';
import Dashboard from '@components/Dashboard';
import Login from '@containers/users/Login';

// TODO: add PrivateRoute

const Router = ({
  knowledgeUnits,
  learningUnits,
  capabilities,
  taxonomies,
  languages,
  actions,
  roles,
  users,
  texts,
  user,
  logs,
}) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Wrapper
          element={<Dashboard />}
          user={user}
          fetchRoles={actions.userFetchRoles}
          logout={actions.userLogout}
        />
      </Route>

      <Route path="/login" exact>
        <Login handleSubmit={actions.userLogin} errors={user.errors} />
      </Route>

      {/* <Route path="/reset-password" exact>
        <div>WIP</div>
      </Route> */}

      {/* <Route path="/datenschutz" exact>
        <div>WIP</div>
      </Route> */}

      {/* <Route path="/nutzungsbedingungen" exact>
        <div>WIP</div>
      </Route> */}

      {/* <Route path="/impressum" exact>
        <div>WIP</div>
      </Route> */}

      <Route path="/messages" exact>
        <Wrapper
          element={<div>WIP</div>}
          // element={<Messages />}
          user={user}
          fetchRoles={actions.userFetchRoles}
          logout={actions.userLogout}
        />
      </Route>

      <Route
        path="/languages"
        render={() => <RoutesLanguages languages={languages} actions={actions} user={user} />}
      />

      <Route
        path="/taxonomies"
        render={() => <RoutesTaxonomies taxonomies={taxonomies} actions={actions} user={user} />}
      />

      <Route
        path="/users"
        render={() => (
          <RoutesUsers
            capabilities={capabilities}
            languages={languages}
            actions={actions}
            roles={roles}
            users={users}
            user={user}
          />
        )}
      />

      <Route
        path="/learning-units"
        render={() => (
          <RoutesLearningUnits
            learningUnits={learningUnits}
            capabilities={capabilities}
            languages={languages}
            actions={actions}
            user={user}
          />
        )}
      />

      <Route
        path="/knowledge-units"
        render={() => (
          <RoutesKnowledgeUnits
            learningUnits={learningUnits}
            knowledgeUnits={knowledgeUnits}
            capabilities={capabilities}
            languages={languages}
            actions={actions}
            user={user}
          />
        )}
      />

      <Route
        path="/texts"
        render={() => (
          <RoutesTexts
            knowledgeUnits={knowledgeUnits}
            capabilities={capabilities}
            languages={languages}
            actions={actions}
            texts={texts}
            user={user}
          />
        )}
      />

      <Route
        path="/logs"
        render={() => (
          <RoutesLogs
            logs={logs}
            learningUnits={learningUnits}
            capabilities={capabilities}
            languages={languages}
            actions={actions}
            user={user}
          />
        )}
      />

      <Redirect to="/" />
    </Switch>
  );
};

Router.propTypes = {
  logs: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  texts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  learningUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  knowledgeUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
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
    userFetchRoles: PropTypes.func.isRequired,
    removeRole: PropTypes.func.isRequired,
    addRole: PropTypes.func.isRequired,
    removeCapability: PropTypes.func.isRequired,
    addCapability: PropTypes.func.isRequired,
    languagesDelete: PropTypes.func.isRequired,
    languagesFetch: PropTypes.func.isRequired,
    languagesEdit: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
    learningUnitsItemFetch: PropTypes.func.isRequired,
    learningUnitsDelete: PropTypes.func.isRequired,
    learningUnitsFetch: PropTypes.func.isRequired,
    learningUnitsEdit: PropTypes.func.isRequired,
    learningUnitsAdd: PropTypes.func.isRequired,
    knowledgeUnitsItemFetch: PropTypes.func.isRequired,
    knowledgeUnitsDelete: PropTypes.func.isRequired,
    knowledgeUnitsFetch: PropTypes.func.isRequired,
    knowledgeUnitsEdit: PropTypes.func.isRequired,
    knowledgeUnitsAdd: PropTypes.func.isRequired,
    textsItemFetch: PropTypes.func.isRequired,
    textsDelete: PropTypes.func.isRequired,
    textsFetch: PropTypes.func.isRequired,
    textsEdit: PropTypes.func.isRequired,
    textsAdd: PropTypes.func.isRequired,
    taxonomiesItemFetch: PropTypes.func.isRequired,
    taxonomiesDelete: PropTypes.func.isRequired,
    taxonomiesFetch: PropTypes.func.isRequired,
    taxonomiesEdit: PropTypes.func.isRequired,
    taxonomiesDisable: PropTypes.func.isRequired,
    taxonomiesEnable: PropTypes.func.isRequired,
    taxonomiesAdd: PropTypes.func.isRequired,
    rolesItemFetch: PropTypes.func.isRequired,
    rolesDelete: PropTypes.func.isRequired,
    rolesFetch: PropTypes.func.isRequired,
    rolesEdit: PropTypes.func.isRequired,
    rolesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    logsFetch: PropTypes.func.isRequired,
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

const mapStateToProps = (state) => ({
  knowledgeUnits: state.knowledgeUnits,
  learningUnits: state.learningUnits,
  capabilities: state.capabilities,
  taxonomies: state.taxonomies,
  languages: state.languages,
  roles: state.roles,
  users: state.users,
  texts: state.texts,
  user: state.user,
  logs: state.logs,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Router));
