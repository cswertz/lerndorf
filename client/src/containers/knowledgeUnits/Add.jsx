import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '../../components/knowledgeUnits/AddForm';

class KnowledgeUnitsAdd extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {

    } = this.props;

    /*
    if (!languages.fetched && !languages.fetching) {
      languagesFetch();
    }
    */
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      history,
      handleSubmit,
      match,
    } = this.props;
    const data = {
      LearningUnitId: match.params.learningUnitId,
      objective: e.target.objective.value,
      comment: e.target.comment.value,
      time: e.target.time.value,
      recommendedAge: e.target.recommendedAge.value,
      publish: e.target.publish.checked,
      review: e.target.review.checked,
      lectorate: e.target.lectorate.checked,
      visiblePublic: e.target.visiblePublic.checked,
      visibleLexicon: e.target.visibleLexicon.checked,
      visibleCourses: e.target.visibleCourses.checked,
      suitableBlind: e.target.suitableBlind.checked,
      suitableDeaf: e.target.suitableDeaf.checked,
      suitableDumb: e.target.suitableDumb.checked,
    };

    handleSubmit(data, history);
  }

  render() {
    const {
      errors,
    } = this.props;

    return (
      <AddForm
        handleSubmit={this.handleSubmit}
        initialValues={{
          language: 1,
        }}
        errors={errors.add}
      />
    );
  }
}

KnowledgeUnitsAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      learningUnitId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const KnowledgeUnitsAddWithRouter = withRouter(KnowledgeUnitsAdd);

export default KnowledgeUnitsAddWithRouter;
