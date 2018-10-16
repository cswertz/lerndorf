import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '../../components/taxonomies/AddForm';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class TaxonomiesAdd extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      match,
      history,
      handleSubmit,
    } = this.props;

    const { id } = match.params;

    const data = {
      parent: id,
      type: e.target.type.value,
    };

    handleSubmit(data, history);
  }

  render() {
    const {
      classes,
      errors,
    } = this.props;

    return (
      <div className={classes.container}>
        <AddForm
          handleSubmit={this.handleSubmit}
          errors={errors.add}
        />
      </div>
    );
  }
}

TaxonomiesAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
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

export default withStyles(styles)(TaxonomiesAddWithRouter);
