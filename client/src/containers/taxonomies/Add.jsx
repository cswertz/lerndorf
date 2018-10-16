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
      history,
      handleSubmit,
    } = this.props;
    const data = {
      type: e.target.type.value,
    };

    handleSubmit(1, data, history);
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
};

const TaxonomiesAddWithRouter = withRouter(TaxonomiesAdd);

export default withStyles(styles)(TaxonomiesAddWithRouter);
