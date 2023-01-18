import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import KnowledgeUnitsEdit from '../knowledgeUnits/Edit';
import KnowledgeUnitsShow from '../knowledgeUnits/Show';
import KnowledgeUnitsList from '../knowledgeUnits/List';
import KnowledgeUnitsAdd from '../knowledgeUnits/Add';
// import KnowledgeUnits from '../knowledgeUnits/List';

const KnowledgeUnitsRouter = ({ knowledgeUnits, learningUnits, actions, user }) => (
  <>
    {/* <Route
      exact
      path="/knowledge-units"
      render={() => (
        <KnowledgeUnits
          knowledgeUnitsDelete={actions.knowledgeUnitsDelete}
          knowledgeUnitsFetch={actions.knowledgeUnitsFetch}
          knowledgeUnits={knowledgeUnits}
        />
      )}
    /> */}

    <Route
      exact
      path="/knowledge-units/add/:learningUnitId"
      render={() => (
        <KnowledgeUnitsAdd
          taxonomiesFetch={actions.knowledgeUnitsTaxonomiesFetch}
          learningUnitFetch={actions.learningUnitsItemFetch}
          taxonomies={knowledgeUnits.taxonomies}
          learningUnits={learningUnits}
          handleSubmit={actions.knowledgeUnitsAdd}
          errors={knowledgeUnits.errors}
          user={user}
        />
      )}
    />

    <Route
      exact
      path="/knowledge-units/list/:id"
      render={() => (
        <KnowledgeUnitsList
          handleDelete={actions.knowledgeUnitsDelete}
          markReviewed={actions.knowledgeUnitsMarkReviewed}
          markLectored={actions.knowledgeUnitsMarkLectored}
          itemFetch={actions.knowledgeUnitsFetch}
          errors={knowledgeUnits.errors}
          items={knowledgeUnits}
          user={user}
        />
      )}
    />

    <Route
      exact
      path="/knowledge-units/show/:id"
      render={() => (
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

    <Route
      exact
      path="/knowledge-units/edit/:id"
      render={() => (
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
