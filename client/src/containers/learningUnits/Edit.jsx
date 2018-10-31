import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/learningUnits/EditForm';

class LearningUnitsEdit extends Component {
  constructor(props) {
    super(props);

    this.addTag = this.addTag.bind(this);
    this.addRelation = this.addRelation.bind(this);
  }

  componentDidMount() {
    /*
    const {
      languages,
      languagesFetch,
    } = this.props;

    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
    */
  }

  addTag(e) {
    e.preventDefault();

    const {
      learningUnitsAddTag,
      history,
      match,
    } = this.props;
    const {
      id,
      languageId,
    } = match.params;
    const tag = e.target.tag.value;

    learningUnitsAddTag(languageId, id, tag, history);
  }

  addRelation(target, type) {
    const {
      learningUnitsAddRelation,
    } = this.props;

    console.log('Add relation', target, type);
  }

  render() {
    const {
      errors,
    } = this.props;

    return (
      <EditForm
        addRelation={this.addRelation}
        addTag={this.addTag}
        errors={errors.add}
      />
    );
  }
}

LearningUnitsEdit.propTypes = {
  // learningUnitsAddRelation: PropTypes.func.isRequired,
  learningUnitsAddTag: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      languageId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const LearningUnitsEditWithRouter = withRouter(LearningUnitsEdit);

export default LearningUnitsEditWithRouter;
