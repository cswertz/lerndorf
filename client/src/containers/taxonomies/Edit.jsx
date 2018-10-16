import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../../components/taxonomies/EditForm';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class TaxonomiesEdit extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match,
      items,
      itemFetch,
    } = this.props;

    const { id } = match.params;

    if ((!items.fetching) && !items.id[id]) {
      itemFetch(id);
    }
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
      type: e.target.type.value,
    };

    handleSubmit(id, data, history);
  }

  render() {
    const {
      items,
      classes,
      errors,
      match,
    } = this.props;

    const { id } = match.params;
    const item = items.id[id];

    return (
      <div className={classes.container}>
        <EditForm
          handleSubmit={this.handleSubmit}
          initialValues={item}
          errors={errors.edit}
        />
      </div>
    );
  }
}

TaxonomiesEdit.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
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

export default withStyles(styles)(TaxonomiesEditWithRouter);
