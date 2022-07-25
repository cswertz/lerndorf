import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import * as AppActions from '@actions';
import PrivateRoute from '@components/PrivateRoute';
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
import Register from '@containers/users/Register';
import Activate from '@containers/users/Activate';
import Content from '@components/Content';
import CreateCourse from '@components/courses/Create';

const Router = ({
  knowledgeUnits,
  learningUnits,
  capabilities,
  taxonomies,
  languages,
  actions,
  roles,
  texts,
  users,
  user,
  logs,
}) => {
  return (
    <Switch>
      <Route path="/login" exact>
        <Login handleSubmit={actions.userLogin} errors={user.errors} />
      </Route>

      <Route path="/register" exact>
        <Register handleSubmit={actions.userRegister} errors={user.errors} />
      </Route>

      <Route path="/users/activate/:hash" exact>
        <Activate
          activate={actions.userActivate}
          activated={user.activated}
          errors={user.errors}
          active={user.active}
        />
      </Route>

      <Route path="/reset-password" exact>
        <div>Reset password WIP</div>
      </Route>

      {/* <Route path="/datenschutz" exact>
        <div>WIP</div>
      </Route> */}

      {/* <Route path="/nutzungsbedingungen" exact>
        <div>WIP</div>
      </Route> */}

      {/* <Route path="/impressum" exact>
        <div>WIP</div>
      </Route> */}

      <Route path="/">
        <Wrapper>
          <Switch>
            <Route path="/" exact>
              {/* show specific content page (welcome) */}
              <Content id={1} />
            </Route>

            <PrivateRoute path="/dashboard" exact>
              <Dashboard />
            </PrivateRoute>

            <PrivateRoute path="/messages" exact>
              use{' '}
              <a href="https://github.com/chatscope/chat-ui-kit-react" rel="noopener">
                https://github.com/chatscope/chat-ui-kit-react
              </a>
              ?
            </PrivateRoute>

            <Route path="/course/create" exact>
              <CreateCourse />
            </Route>

            <Route path="/course/:id" exact>
              {/* <Course /> */}
              <div>Course WIP</div>
            </Route>

            <Route path="/content/:id" exact>
              <Content />
            </Route>

            <Route path="/settings" exact>
              <div>Settings WIP</div>
            </Route>

            <PrivateRoute path="/languages">
              <RoutesLanguages languages={languages} actions={actions} user={user} />
            </PrivateRoute>

            <PrivateRoute path="/taxonomies">
              <RoutesTaxonomies taxonomies={taxonomies} actions={actions} user={user} />
            </PrivateRoute>

            <PrivateRoute path="/users">
              <RoutesUsers
                capabilities={capabilities}
                languages={languages}
                actions={actions}
                roles={roles}
                users={users}
                user={user}
              />
            </PrivateRoute>

            <Route path="/learning-units">
              <RoutesLearningUnits
                learningUnits={learningUnits}
                capabilities={capabilities}
                languages={languages}
                actions={actions}
                user={user}
              />
            </Route>

            <Route path="/knowledge-units">
              <RoutesKnowledgeUnits
                learningUnits={learningUnits}
                knowledgeUnits={knowledgeUnits}
                capabilities={capabilities}
                languages={languages}
                actions={actions}
                user={user}
              />
            </Route>

            <Route path="/texts">
              <RoutesTexts
                knowledgeUnits={knowledgeUnits}
                capabilities={capabilities}
                languages={languages}
                actions={actions}
                texts={texts}
                user={user}
              />
            </Route>

            <PrivateRoute path="/logs">
              <RoutesLogs
                logs={logs}
                learningUnits={learningUnits}
                capabilities={capabilities}
                languages={languages}
                actions={actions}
                user={user}
              />
            </PrivateRoute>
          </Switch>
        </Wrapper>
      </Route>

      <Redirect to="/dashboard" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Router);
