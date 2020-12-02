import Typography from '@material-ui/core/Typography';
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
      learningUnitFetch,
      taxonomiesFetch,
      learningUnits,
      taxonomies,
      match,
    } = this.props;

    if (!taxonomies.fetched && !taxonomies.fetching) {
      taxonomiesFetch();
    }

    const {
      learningUnitId,
    } = match.params;

    if ((!learningUnits.fetching) && !learningUnits.id[learningUnitId]) {
      learningUnitFetch(learningUnitId);
    }
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
      visiblePublic: e.target.visiblePublic.checked,
      visibleLexicon: e.target.visibleLexicon.checked,
      visibleCourses: e.target.visibleCourses.checked,
      suitableBlind: e.target.suitableBlind.checked,
      suitableDeaf: e.target.suitableDeaf.checked,
      suitableDumb: e.target.suitableDumb.checked,
      minimumScreenResolution: e.target.minimumScreenResolution.value,
      knowledgeType: e.target.knowledgeType.value,
      courseLevel: e.target.courseLevel.value,
      mediaType: e.target.mediaType.value,
      license: e.target.license.value,
      eqfLevel: e.target.eqfLevel.value,
    };

    data.minimumScreenResolution = (data.minimumScreenResolution.isInteger !== '')
      ? data.minimumScreenResolution : null;
    data.knowledgeType = (data.knowledgeType !== '') ? data.knowledgeType : null;
    data.courseLevel = (data.courseLevel.isInteger !== '') ? data.courseLevel : null;
    data.mediaType = (data.mediaType.isInteger !== '') ? data.mediaType : null;
    data.license = (data.license.isInteger !== '') ? data.license : null;
    data.eqfLevel = (data.eqfLevel.isInteger !== '') ? data.eqfLevel : null;

    handleSubmit(data, history);
  }

  render() {
    const {
      learningUnits,
      taxonomies,
      errors,
      match,
      user,
    } = this.props;
    const { learningUnitId } = match.params;

    let learningUnitTitle = '';
    if (learningUnits.id[learningUnitId]) {
      const learningUnit = learningUnits.id[learningUnitId];
      if (learningUnit[1]) {
        learningUnitTitle = learningUnit[1].title;
      }
    }

    return (
      <div>
        <Typography variant="h5">
          {'"'}{learningUnitTitle}{'"'}
        </Typography>
        <AddForm
          handleSubmit={this.handleSubmit}
          taxonomies={taxonomies.items}
          initialValues={{
            language: 1,
            minimumScreenResolution: 88,
            courseLevel: 82,
          }}
          errors={errors.add}
          user={user}
        />
      </div>
    );
  }
}

KnowledgeUnitsAdd.propTypes = {
  learningUnitFetch: PropTypes.func.isRequired,
  learningUnits: PropTypes.shape({}).isRequired,
  taxonomiesFetch: PropTypes.func.isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
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
