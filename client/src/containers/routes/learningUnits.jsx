import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';

// import LearningUnitsEdit from '../learningUnits/Edit';
import LearningUnitsShow from '../learningUnits/Show';
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

    <Route
      exact
      path="/learning-units/show/:languageId/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LearningUnitsWrapper"
          logout={actions.userLogout}
          title="LearningU"
          active="learningUnits"
          user={user}
          element={(
            <LearningUnitsShow
              user={user}
              itemFetch={actions.learningUnitsItemFetch}
              handleSubmit={actions.learningUnitsEdit}
              errors={learningUnits.errors}
              items={learningUnits}
            />
          )}
        />
      )}
    />
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
    learningUnitsItemFetch: PropTypes.func.isRequired,
    learningUnitsDelete: PropTypes.func.isRequired,
    learningUnitsFetch: PropTypes.func.isRequired,
    learningUnitsEdit: PropTypes.func.isRequired,
    learningUnitsAdd: PropTypes.func.isRequired,
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
