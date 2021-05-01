import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '@components/users/roles/Show';

class RolesShow extends Component {
  componentDidMount() {
    const { match, items, itemFetch } = this.props;

    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  render() {
    const { items, match } = this.props;

    const { id } = match.params;
    const item = items.id[id];
    if (!item) return null;

    return <Show item={item} />;
  }
}

RolesShow.propTypes = {
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

const RolesShowWithRouter = withRouter(RolesShow);

export default RolesShowWithRouter;
