import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '../../components/taxonomies/AddForm';

class TaxonomiesAdd extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { match, history, handleSubmit } = this.props;

    const { id } = match.params;

    const data = {
      parent: id,
      type: e.target.type.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const { errors } = this.props;

    return <AddForm handleSubmit={this.handleSubmit} errors={errors.add} />;
  }
}

TaxonomiesAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const TaxonomiesAddWithRouter = withRouter(TaxonomiesAdd);

export default TaxonomiesAddWithRouter;
