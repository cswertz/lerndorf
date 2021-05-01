import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '@components/routes/wrapper';
import WrapperText from './wrapperText';

import TextsEdit from '../texts/Edit';
import TextsShow from '../texts/Show';
import TextsAdd from '../texts/Add';
// import Texts from '../texts/List';

const TextsRouter = ({ knowledgeUnits, languages, actions, texts, user }) => (
  <>
    <Route
      exact
      path="/texts/add/knowledge-units/:KnowledgeUnitId"
      render={() => (
        <WrapperText
          fetchRoles={actions.userFetchRoles}
          knowledgeUnitsItemFetch={actions.knowledgeUnitsItemFetch}
          title="Add Text to Knowledge Unit: "
          className="LearningUnitsWrapper"
          logout={actions.userLogout}
          knowledgeUnits={knowledgeUnits}
          active="texts"
          user={user}
          element={
            <TextsAdd
              languagesFetch={actions.languagesFetch}
              handleSubmit={actions.textsAdd}
              languages={languages}
              errors={texts.errors}
            />
          }
        />
      )}
    />

    <Route
      exact
      path="/texts/show/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TextsWrapper"
          logout={actions.userLogout}
          title="Text"
          active="texts"
          user={user}
          element={
            <TextsShow
              itemFetch={actions.textsItemFetch}
              handleSubmit={actions.textsEdit}
              errors={texts.errors}
              items={texts}
            />
          }
        />
      )}
    />

    <Route
      exact
      path="/texts/edit/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="TextsWrapper"
          logout={actions.userLogout}
          title="Text"
          active="texts"
          user={user}
          element={
            <TextsEdit
              languagesFetch={actions.languagesFetch}
              itemFetch={actions.textsItemFetch}
              handleSubmit={actions.textsEdit}
              languages={languages}
              errors={texts.errors}
              items={texts}
            />
          }
        />
      )}
    />
  </>
);

TextsRouter.propTypes = {
  knowledgeUnits: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  texts: PropTypes.shape({
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
    userFetchRoles: PropTypes.func.isRequired,
    languagesFetch: PropTypes.func.isRequired,
    textsItemFetch: PropTypes.func.isRequired,
    textsDelete: PropTypes.func.isRequired,
    textsFetch: PropTypes.func.isRequired,
    textsEdit: PropTypes.func.isRequired,
    textsAdd: PropTypes.func.isRequired,
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

export default TextsRouter;
