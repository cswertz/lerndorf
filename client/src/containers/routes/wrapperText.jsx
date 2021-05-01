import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@components/routes/wrapper';

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
    const { knowledgeUnits, fetchRoles, element, logout, user, match, title } = this.props;

    const { KnowledgeUnitId } = match.params;

    let topTitle = title;
    if (knowledgeUnits.id[KnowledgeUnitId]) {
      const knowledgeUnit = knowledgeUnits.id[KnowledgeUnitId];
      const learningUnitTitle = knowledgeUnit.LearningUnit.Translations[0].title;
      topTitle += `#${KnowledgeUnitId} (${learningUnitTitle})`;
    }

    return (
      <Wrapper
        className="LearningUnitsWrapper"
        fetchRoles={fetchRoles}
        active="learningUnits"
        element={element}
        logout={logout}
        title={topTitle}
        user={user}
      />
    );
  }
}

WrapperText.propTypes = {
  fetchRoles: PropTypes.func.isRequired,
  element: PropTypes.element.isRequired,
  user: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
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
