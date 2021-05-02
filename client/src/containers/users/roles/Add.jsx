import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '@components/users/roles/AddForm';

class RolesAdd extends Component {
  constructor(props) {
    super(props);

    this.fetchLanguages = this.fetchLanguages.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchLanguages();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { history, languages, handleSubmit } = this.props;
    const data = {
      name: e.target.name.value,
      translations: [],
    };

    for (const language of languages.languages) {
      const { id, code } = language;

      if (e.target[code]) {
        const vocable = e.target[code].value;
        const translation = {
          id,
          vocable,
        };

        data.translations.push(translation);
      }
    }

    handleSubmit(data, history);
  }

  fetchLanguages() {
    const { languages, languagesFetch } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  render() {
    const { errors, languages } = this.props;

    return (
      <AddForm
        handleSubmit={this.handleSubmit}
        languages={languages.languages}
        errors={errors.add}
      />
    );
  }
}

RolesAdd.propTypes = {
  languages: PropTypes.shape({}).isRequired,
  languagesFetch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const RolesAddWithRouter = withRouter(RolesAdd);

export default RolesAddWithRouter;
