import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '../../components/knowledgeUnits/Show';

class KnowledgeUnitsShow extends Component {
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

    if ((!items.fetching) && !items.id[id]) {
      itemFetch(id);
    }
  }

  render() {
    const {
      markReviewed,
      markLectored,
      items,
      match,
      user,
    } = this.props;

    const {
      id,
    } = match.params;
    let item = items.id[id];
    if (!item) return null;

    item = items.id[id];
    return (
      <Show
        markReviewed={markReviewed}
        markLectored={markLectored}
        item={item}
        user={user}
      />
    );
  }
}

KnowledgeUnitsShow.propTypes = {
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  items: PropTypes.shape({}).isRequired,
  itemFetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const KnowledgeUnitsShowWithRouter = withRouter(KnowledgeUnitsShow);

export default KnowledgeUnitsShowWithRouter;
