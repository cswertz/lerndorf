import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '@components/knowledgeUnits/Show';
import actions from 'redux-form/lib/actions';

class KnowledgeUnitsList extends Component {
  componentDidMount() {
    this.fetchItem();

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidUpdate() {}

  handleDelete(id) {
    const { handleDelete, history } = this.props;

    handleDelete(id, history);
  }

  fetchItem() {
    const { match, items, itemFetch } = this.props;
    itemFetch();
  }

  render() {
    const { markReviewed, markLectored, items, match, user, itemFetch } = this.props;
    const itemsToRender = items.items.filter(
      (item) => item.LearningUnitId === parseInt(match.params.id, 10),
    );

    return (
      <>
        {itemsToRender.length === 0 && (
          <>
            <div>No entries found.</div>
          </>
        )}
        {itemsToRender.map((item) => {
          return (
            <Show
              handleDelete={this.handleDelete}
              markReviewed={(row) => {
                markReviewed(row).then(() => itemFetch());
              }}
              markLectored={(row) => {
                markLectored(row).then(() => itemFetch());
              }}
              item={item}
              user={user}
            />
          );
        })}
      </>
    );
  }
}

KnowledgeUnitsList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  items: PropTypes.shape({
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetchingId: PropTypes.string,
  }).isRequired,
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

const KnowledgeUnitsListWithRouter = withRouter(KnowledgeUnitsList);

export default KnowledgeUnitsListWithRouter;
