//import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import Appbar from '../../containers/Appbar';

import Wrapper from '../../components/routes/wrapper';

class WrapperLearningUnit extends Component {

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem() {
    const {
      itemFetch,
      match,
      items,
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
      fetchRoles,
      className,
      classes,
      element,
      logout,
      active,
      user,
      match,
      items
    } = this.props;

    const { id,languageId } = match.params;

    let title = "Editing Learning Unit: ";
    if(items.id[id]) {
      title += items.id[id][languageId].title;
    }

    return (
      <Wrapper
        fetchRoles={fetchRoles}
        className="LearningUnitsWrapper"
        logout={logout}
        title={title}
        active="learningUnits"
        user={user}
        element={element}
      />
    )
  }
}

WrapperLearningUnit.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  element: PropTypes.element.isRequired,
  user: PropTypes.shape({}).isRequired,
  active: PropTypes.string.isRequired,
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
