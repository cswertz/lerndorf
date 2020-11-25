import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';

import KnowledgeUnitsEdit from '../knowledgeUnits/Edit';
import KnowledgeUnitsShow from '../knowledgeUnits/Show';
import KnowledgeUnitsAdd from '../knowledgeUnits/Add';
// import KnowledgeUnits from '../knowledgeUnits/List';

const KnowledgeUnitsRouter = ({
  knowledgeUnits,
  learningUnits,
  actions,
  user,
}) => (
  <>
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
              taxonomiesFetch={actions.knowledgeUnitsTaxonomiesFetch}
              learningUnitFetch={actions.learningUnitsItemFetch}
              taxonomies={knowledgeUnits.taxonomies}
              learningUnits={learningUnits}
              handleSubmit={actions.knowledgeUnitsAdd}
              errors={knowledgeUnits.errors}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/knowledge-units/show/:id"
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
              handleDelete={actions.knowledgeUnitsDelete}
              markReviewed={actions.knowledgeUnitsMarkReviewed}
              markLectored={actions.knowledgeUnitsMarkLectored}
              itemFetch={actions.knowledgeUnitsItemFetch}
              handleSubmit={actions.knowledgeUnitsEdit}
              errors={knowledgeUnits.errors}
              items={knowledgeUnits}
              user={user}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/knowledge-units/edit/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="KnowledgeUnitsWrapper"
          logout={actions.userLogout}
          title="Knowledge Unit"
          active="knowledgeUnits"
          user={user}
          element={(
            <KnowledgeUnitsEdit
              taxonomiesFetch={actions.knowledgeUnitsTaxonomiesFetch}
              itemFetch={actions.knowledgeUnitsItemFetch}
              taxonomies={knowledgeUnits.taxonomies}
              learningUnits={learningUnits}
              handleSubmit={actions.knowledgeUnitsEdit}
              errors={knowledgeUnits.errors}
              items={knowledgeUnits}
            />
          )}
        />
      )}
    />
  </>
);

KnowledgeUnitsRouter.propTypes = {
  learningUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  knowledgeUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    knowledgeUnitsMarkReviewed: PropTypes.func.isRequired,
    knowledgeUnitsMarkLectored: PropTypes.func.isRequired,
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
