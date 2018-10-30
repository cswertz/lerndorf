import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';

// import KnowledgeUnitsEdit from '../knowledgeUnits/Edit';
// import KnowledgeUnitsShow from '../knowledgeUnits/Show';
import KnowledgeUnitsAdd from '../knowledgeUnits/Add';
// import KnowledgeUnits from '../knowledgeUnits/List';

const KnowledgeUnitsRouter = ({
  knowledgeUnits,
  actions,
  user,
}) => (
  <React.Fragment>
    {/*
    <Route
      exact
      path="/knowledge-units"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="KnowledgeUnitsWrapper"
          logout={actions.userLogout}
          active="knowledgeUnits"
          title="Knowledge Units"
          user={user}
          element={(
            <KnowledgeUnits
              knowledgeUnitsDelete={actions.knowledgeUnitsDelete}
              knowledgeUnitsFetch={actions.knowledgeUnitsFetch}
              knowledgeUnits={knowledgeUnits}
            />
          )}
        />
      )}
    />
    */}

    <Route
      exact
      path="/knowledge-units/add/:learningUnitId"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LearningUnitsWrapper"
          logout={actions.userLogout}
          title="Add Knowledge Unit"
          active="knowledgeUnits"
          user={user}
          element={(
            <KnowledgeUnitsAdd
              handleSubmit={actions.knowledgeUnitsAdd}
              errors={knowledgeUnits.errors}
            />
          )}
        />
      )}
    />

    {/*
    <Route
      exact
      path="/knowledge-units/show/:languageId/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="KnowledgeUnitsWrapper"
          logout={actions.userLogout}
          title="Knowledge Unit"
          active="knowledgeUnits"
          user={user}
          element={(
            <KnowledgeUnitsShow
              itemFetch={actions.knowledgeUnitsItemFetch}
              handleSubmit={actions.knowledgeUnitsEdit}
              errors={knowledgeUnits.errors}
              items={knowledgeUnits}
            />
          )}
        />
      )}
    />
    */}
  </React.Fragment>
);

KnowledgeUnitsRouter.propTypes = {
  knowledgeUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    knowledgeUnitsItemFetch: PropTypes.func.isRequired,
    knowledgeUnitsDelete: PropTypes.func.isRequired,
    knowledgeUnitsFetch: PropTypes.func.isRequired,
    knowledgeUnitsEdit: PropTypes.func.isRequired,
    knowledgeUnitsAdd: PropTypes.func.isRequired,
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

export default KnowledgeUnitsRouter;
