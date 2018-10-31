import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '../../components/knowledgeUnits/Show';

class KnowledgeUnitsShow extends Component {
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
      user,
    } = this.props;

    const {
      id,
    } = match.params;
    let item = items.id[id];
    console.log(id);
    if (!item) return null;
    console.log(item);

    item = items.id[id];
    return (
      <Show
        item={item}
        user={user}
      />
    );
  }
}

KnowledgeUnitsShow.propTypes = {
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
