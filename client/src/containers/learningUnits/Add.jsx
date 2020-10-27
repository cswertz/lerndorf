import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '../../components/learningUnits/AddForm';

class LearningUnitsAdd extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      languages,
      languagesFetch,
    } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      history,
      handleSubmit,
    } = this.props;
    const data = {
      language: e.target.language.value,
      title: e.target.title.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const {
      languages,
      errors,
    } = this.props;

    return (
      <AddForm
        handleSubmit={this.handleSubmit}
        languages={languages.languages}
        initialValues={{
          language: 1,
        }}
        errors={errors.add}
      />
    );
  }
}

LearningUnitsAdd.propTypes = {
  languagesFetch: PropTypes.func.isRequired,
  languages: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const LearningUnitsAddWithRouter = withRouter(LearningUnitsAdd);

export default LearningUnitsAddWithRouter;
