import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@components/UI/Wrapper';

class WrapperText extends Component {
  componentDidMount() {
    this.fetchKnowledgeUnits();
  }

  componentDidUpdate() {
    this.fetchKnowledgeUnits();
  }

  fetchKnowledgeUnits() {
    const { knowledgeUnitsItemFetch, knowledgeUnits, match } = this.props;
    const { KnowledgeUnitId } = match.params;

    if (!knowledgeUnits.id[KnowledgeUnitId] && knowledgeUnits.fetchingId !== KnowledgeUnitId) {
      knowledgeUnitsItemFetch(KnowledgeUnitId);
    }
  }

  render() {
    const { knowledgeUnits, children, match, title } = this.props;
    const { KnowledgeUnitId } = match.params;

    let topTitle = title;
    if (knowledgeUnits.id[KnowledgeUnitId]) {
      const knowledgeUnit = knowledgeUnits.id[KnowledgeUnitId];
      const learningUnitTitle = knowledgeUnit.LearningUnit.Translations[0].title;
      topTitle += `#${KnowledgeUnitId} (${learningUnitTitle})`;
    }

    return (
      <Wrapper className="LearningUnitsWrapper" active="learningUnits" title={topTitle}>
        {children}
      </Wrapper>
    );
  }
}

WrapperText.propTypes = {
  knowledgeUnitsItemFetch: PropTypes.func.isRequired,
  knowledgeUnits: PropTypes.shape({
    id: PropTypes.shape().isRequired,
    fetchingId: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      KnowledgeUnitId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(WrapperText);
