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

    const { history, handleSubmit } = this.props;
    const data = {
      parent: 1,
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
};

const TaxonomiesAddWithRouter = withRouter(TaxonomiesAdd);

export default TaxonomiesAddWithRouter;
