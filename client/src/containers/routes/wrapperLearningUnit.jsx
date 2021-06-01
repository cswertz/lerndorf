import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { children, match, items } = this.props;
    const { id, languageId } = match.params;

    // TODO: title needed?
    let title = 'Editing Learning Unit: ';
    if (items.id[id]) {
      title += items.id[id][languageId].title;
    }

    return children;
  }
}

WrapperLearningUnit.propTypes = {
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
