import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from '@components/UI/Wrapper';

import LanguagesEdit from '../languages/Edit';
import LanguagesAdd from '../languages/Add';
import Languages from '../languages/List';

const LanguagesRouter = ({ languages, actions }) => (
  <>
    <Route
      exact
      path="/languages"
      render={() => (
        <Wrapper className="LanguagesWrapper" active="languages" title="Languages">
          <Languages
            languagesDelete={actions.languagesDelete}
            languagesFetch={actions.languagesFetch}
            languages={languages}
          />
        </Wrapper>
      )}
    />

    <Route
      exact
      path="/languages/add"
      render={() => (
        <Wrapper className="LanguagesWrapper" title="Add Language" active="languages">
          <LanguagesAdd handleSubmit={actions.languagesAdd} errors={languages.errors} />
        </Wrapper>
      )}
    />

    <Route
      exact
      path="/languages/edit/:id"
      render={() => (
        <Wrapper className="LanguagesWrapper" title="Edit Language" active="languages">
          <LanguagesEdit
            languagesFetch={actions.languagesFetch}
            handleSubmit={actions.languagesEdit}
            errors={languages.errors}
            languages={languages}
          />
        </Wrapper>
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
