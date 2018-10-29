import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '../../components/learningUnits/Show';

class LearningUnitsShow extends Component {
  componentDidMount() {
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
      items,
      match,
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
        item={item}
      />
    );
  }
}

LearningUnitsShow.propTypes = {
  items: PropTypes.shape({}).isRequired,
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
