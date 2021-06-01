import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import LanguagesEdit from '../languages/Edit';
import LanguagesAdd from '../languages/Add';
import Languages from '../languages/List';

const LanguagesRouter = ({ languages, actions }) => (
  <>
    <Route
      exact
      path="/languages"
      render={() => (
        <Languages
          languagesDelete={actions.languagesDelete}
          languagesFetch={actions.languagesFetch}
          languages={languages}
        />
      )}
    />

    <Route
      exact
      path="/languages/add"
      render={() => <LanguagesAdd handleSubmit={actions.languagesAdd} errors={languages.errors} />}
    />

    <Route
      exact
      path="/languages/edit/:id"
      render={() => (
        <LanguagesEdit
          languagesFetch={actions.languagesFetch}
          handleSubmit={actions.languagesEdit}
          errors={languages.errors}
          languages={languages}
        />
      )}
    />
  </>
);

LanguagesRouter.propTypes = {
  languages: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    languagesDelete: PropTypes.func.isRequired,
    languagesFetch: PropTypes.func.isRequired,
    languagesEdit: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
  }).isRequired,
};

export default LanguagesRouter;
