import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/languages/EditForm';

class LanguagesEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match,
      languages,
      languagesFetch,
    } = this.props;

    const { id } = match.params;

    if ((!languages.fetched && !languages.fetching) && !languages.id[id]) {
      languagesFetch();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      match,
      history,
      handleSubmit,
    } = this.props;

    const { id } = match.params;

    const data = {
      name: e.target.name.value,
    };

    handleSubmit(id, data, history);
  }

  render() {
    const {
      languages,
      errors,
      match,
    } = this.props;

    const { id } = match.params;
    const language = languages.id[id];

    return (
      <EditForm
        handleSubmit={this.handleSubmit}
        initialValues={language}
        errors={errors.edit}
      />
    );
  }
}

LanguagesEdit.propTypes = {
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const LanguagesEditWithRouter = withRouter(LanguagesEdit);

export default LanguagesEditWithRouter;
