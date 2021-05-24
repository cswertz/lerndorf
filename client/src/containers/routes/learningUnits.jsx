import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from '@components/UI/Wrapper';
import WrapperLearningUnit from './wrapperLearningUnit';

import LearningUnitsEdit from '../learningUnits/Edit';
import LearningUnitsShow from '../learningUnits/Show';
import LearningUnitsAdd from '../learningUnits/Add';
import LearningUnits from '../learningUnits/List';

const LearningUnitsRouter = ({ learningUnits, languages, actions, user }) => (
  <>
    <Route
      exact
      path="/learning-units"
      render={() => (
        <Wrapper className="LearningUnitsWrapper" active="learningUnits" title="Learning Units">
          <LearningUnits
            user={user}
            learningUnitsDelete={actions.learningUnitsDelete}
            learningUnitsFetch={actions.learningUnitsFetch}
            learningUnits={learningUnits}
          />
        </Wrapper>
      )}
    />

    <Route
      exact
      path="/learning-units/add"
      render={() => (
        <Wrapper className="LearningUnitsWrapper" title="Add Learning Unit" active="learningUnits">
          <LearningUnitsAdd
            handleSubmit={actions.learningUnitsAdd}
            languagesFetch={actions.languagesFetch}
            languages={languages}
            errors={learningUnits.errors}
          />
        </Wrapper>
      )}
    />

    <Route
      exact
      path="/learning-units/show/:languageId/:id"
      render={() => (
        <Wrapper className="LearningUnitsWrapper" title="Learning Unit" active="learningUnits">
          <LearningUnitsShow
            handleKnowledgeUnitDelete={actions.knowledgeUnitsDelete}
            markReviewed={actions.knowledgeUnitsMarkReviewed}
            markLectored={actions.knowledgeUnitsMarkLectored}
            user={user}
            itemFetch={actions.learningUnitsItemFetch}
            handleSubmit={actions.learningUnitsEdit}
            errors={learningUnits.errors}
            items={learningUnits}
          />
        </Wrapper>
      )}
    />

    <Route
      exact
      path="/learning-units/edit/:languageId/:id"
      render={() => (
        <WrapperLearningUnit
          itemFetch={actions.learningUnitsItemFetch}
          className="LearningUnitsWrapper"
          items={learningUnits}
        >
          <LearningUnitsEdit
            learningUnitsDeleteRelation={actions.learningUnitsDeleteRelation}
            learningUnitsAddRelation={actions.learningUnitsAddRelation}
            fetchSuggestions={actions.learningUnitsSuggestionsFetch}
            learningUnitsDeleteTag={actions.learningUnitsDeleteTag}
            learningUnitsUpdateTag={actions.learningUnitsUpdateTag}
            taxonomiesFetch={actions.learningUnitsTaxonomiesFetch}
            learningUnitsAddTag={actions.learningUnitsAddTag}
            learningUnitsEdit={actions.learningUnitsEdit}
            itemFetch={actions.learningUnitsItemFetch}
            handleSubmit={actions.learningUnitsEdit}
            suggestions={learningUnits.suggestions}
            taxonomies={learningUnits.taxonomies}
            errors={learningUnits.errors}
            items={learningUnits}
            user={user}
          />
        </WrapperLearningUnit>
      )}
    />
  </>
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
    knowledgeUnitsMarkReviewed: PropTypes.func.isRequired,
    knowledgeUnitsMarkLectored: PropTypes.func.isRequired,
    learningUnitsItemFetch: PropTypes.func.isRequired,
    learningUnitsDeleteTag: PropTypes.func.isRequired,
    knowledgeUnitsDelete: PropTypes.func.isRequired,
    learningUnitsDelete: PropTypes.func.isRequired,
    learningUnitsAddTag: PropTypes.func.isRequired,
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
