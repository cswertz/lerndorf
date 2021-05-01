import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Wrapper from '@components/routes/wrapper';

class WrapperLearningUnit extends Component {
  componentDidMount() {
    this.fetchItem();
  }

  componentDidUpdate() {
    this.fetchItem();
  }

  fetchItem() {
    const { itemFetch, match, items } = this.props;

    const { id } = match.params;

    if (!items.id[id] && items.fetchingId !== id) {
      itemFetch(id);
    }
  }

  render() {
    const { fetchRoles, element, logout, user, match, items } = this.props;

    const { id, languageId } = match.params;

    let title = 'Editing Learning Unit: ';
    if (items.id[id]) {
      title += items.id[id][languageId].title;
    }

    return (
      <Wrapper
        className="LearningUnitsWrapper"
        fetchRoles={fetchRoles}
        active="learningUnits"
        element={element}
        logout={logout}
        title={title}
        user={user}
      />
    );
  }
}

WrapperLearningUnit.propTypes = {
  fetchRoles: PropTypes.func.isRequired,
  element: PropTypes.element.isRequired,
  user: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
  itemFetch: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      languageId: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(WrapperLearningUnit);
