import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '../../components/learningUnits/Show';

class LearningUnitsShow extends Component {
  componentDidMount() {
    this.fetchItem();
  }

  componentDidUpdate() {
    this.fetchItem();
  }

  fetchItem() {
    const {
      match,
      items,
      itemFetch,
    } = this.props;

    const {
      id,
    } = match.params;

    if (!items.id[id] && items.fetchingId !== id) {
      itemFetch(id);
    }
  }

  render() {
    const {
      handleKnowledgeUnitDelete,
      markReviewed,
      markLectored,
      items,
      match,
      user,
    } = this.props;

    const {
      id,
      languageId,
    } = match.params;
    let item = items.id[id];
    if (!item) return null;

    item = items.id[id][languageId];
    return (
      <Show
        handleKnowledgeUnitDelete={handleKnowledgeUnitDelete}
        markReviewed={markReviewed}
        markLectored={markLectored}
        item={item}
        user={user}
      />
    );
  }
}

LearningUnitsShow.propTypes = {
  handleKnowledgeUnitDelete: PropTypes.func.isRequired,
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  items: PropTypes.shape({
    id: PropTypes.shape({}).isRequired,
    fetchingId: PropTypes.string,
  }).isRequired,
  itemFetch: PropTypes.func.isRequired,
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

const LearningUnitsShowWithRouter = withRouter(LearningUnitsShow);

export default LearningUnitsShowWithRouter;
