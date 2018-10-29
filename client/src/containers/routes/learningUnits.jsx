import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';

// import LearningUnitsEdit from '../learningUnits/Edit';
import LearningUnitsAdd from '../learningUnits/Add';
import LearningUnits from '../learningUnits/List';

const LearningUnitsRouter = ({
  learningUnits,
  languages,
  actions,
  user,
}) => (
  <React.Fragment>
    <Route
      exact
      path="/learning-units"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LearningUnitsWrapper"
          logout={actions.userLogout}
          active="learningUnits"
          title="Learning Units"
          user={user}
          element={(
            <LearningUnits
              learningUnitsDelete={actions.learningUnitsDelete}
              learningUnitsFetch={actions.learningUnitsFetch}
              learningUnits={learningUnits}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/learning-units/add"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LearningUnitsWrapper"
          logout={actions.userLogout}
          title="Add Learning Unit"
          active="learningUnits"
          user={user}
          element={(
            <LearningUnitsAdd
              handleSubmit={actions.learningUnitsAdd}
              languagesFetch={actions.languagesFetch}
              languages={languages}
              errors={learningUnits.errors}
            />
          )}
        />
      )}
    />

    {/*
    <Route
      exact
      path="/learning-units/edit/:id"
      render={() => (
        <Wrapper
          className="LearningUnitsWrapper"
          logout={actions.userLogout}
          title="Edit Language"
          active="learningUnits"
          user={user}
          element={(
            <LearningUnitsEdit
              learningUnitsFetch={actions.learningUnitsFetch}
              handleSubmit={actions.learningUnitsEdit}
              errors={learningUnits.errors}
              learningUnits={learningUnits}
            />
          )}
        />
      )}
    />
    */}
  </React.Fragment>
);

LearningUnitsRouter.propTypes = {
  learningUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
    knowledgeUnitsItemFetch: PropTypes.func.isRequired,
    knowledgeUnitsDelete: PropTypes.func.isRequired,
    knowledgeUnitsFetch: PropTypes.func.isRequired,
    knowledgeUnitsEdit: PropTypes.func.isRequired,
    knowledgeUnitssAdd: PropTypes.func.isRequired,
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

export default LearningUnitsRouter;
