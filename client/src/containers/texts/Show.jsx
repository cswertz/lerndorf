import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '@components/texts/Show';

class TextsShow extends Component {
  componentDidMount() {
    const { match, items, itemFetch } = this.props;

    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  componentDidUpdate() {
    const { match, items, itemFetch } = this.props;

    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  render() {
    const { items, match } = this.props;

    const { id } = match.params;
    let item = items.id[id];
    if (!item) return null;

    item = items.id[id];
    return <Show item={item} />;
  }
}

TextsShow.propTypes = {
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

const TextsShowWithRouter = withRouter(TextsShow);

export default TextsShowWithRouter;
