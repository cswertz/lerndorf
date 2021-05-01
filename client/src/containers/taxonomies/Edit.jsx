import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '@components/taxonomies/EditForm';

class TaxonomiesEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match, items, itemFetch } = this.props;

    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { match, history, handleSubmit } = this.props;

    const { id } = match.params;

    const data = {
      type: e.target.type.value,
    };

    handleSubmit(id, data, history);
  }

  render() {
    const { errors, items, match } = this.props;

    const { id } = match.params;
    const item = items.id[id];

    return <EditForm handleSubmit={this.handleSubmit} initialValues={item} errors={errors.edit} />;
  }
}

TaxonomiesEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
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

const TaxonomiesEditWithRouter = withRouter(TaxonomiesEdit);

export default TaxonomiesEditWithRouter;
