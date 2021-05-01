import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../components/taxonomies/List';

class Taxonomies extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleEnable = this.handleEnable.bind(this);
  }

  componentDidMount() {
    const { items, itemsFetch } = this.props;

    if (!items.fetched && !items.fetching) {
      itemsFetch();
    }
  }

  componentDidUpdate() {
    const { items, itemsFetch } = this.props;

    if (!items.fetched && !items.fetching) {
      itemsFetch();
    }
  }

  handleDelete(id) {
    const { itemsDelete } = this.props;

    itemsDelete(id);
  }

  handleDisable(id) {
    const { itemsDisable } = this.props;

    itemsDisable(id);
  }

  handleEnable(id) {
    const { itemsEnable } = this.props;
    itemsEnable(id);
  }

  render() {
    const { history, items } = this.props;

    return (
      <div>
        <Typography variant="title">Available taxonomies</Typography>
        <List
          itemsDelete={this.handleDelete}
          itemsDisable={this.handleDisable}
          itemsEnable={this.handleEnable}
          items={items.items}
          history={history}
        />
        <Grid>
          <Button onClick={() => history.push('/taxonomies/add')} variant="contained">
            Add new taxonomy
          </Button>
        </Grid>
      </div>
    );
  }
}

Taxonomies.propTypes = {
  itemsDelete: PropTypes.func.isRequired,
  itemsDisable: PropTypes.func.isRequired,
  itemsEnable: PropTypes.func.isRequired,
  itemsFetch: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const TaxonomiesWithRouter = withRouter(Taxonomies);

export default TaxonomiesWithRouter;
