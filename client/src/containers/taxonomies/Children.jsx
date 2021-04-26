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

    this.fetchItemById = this.fetchItemById.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.handleEnable = this.handleEnable.bind(this);
  }

  componentDidMount() {
    this.fetchItemById();
  }

  componentDidUpdate() {
    this.fetchItemById();
  }

  fetchItemById() {
    const {
      items,
      match,
      itemFetch,
    } = this.props;

    const { id } = match.params;

    if (!items.fetching && !items.id[id]) {
      itemFetch(id);
    }
  }

  handleDelete(id) {
    const {
      itemsDelete,
    } = this.props;

    itemsDelete(id);
  }

  handleDisable(id) {
    const {
      itemsDisable,
    } = this.props;

    itemsDisable(id);
  }

  handleEnable(id) {
    const {
      itemsEnable,
    } = this.props;

    itemsEnable(id);
  }

  render() {
    const {
      history,
      match,
      items,
    } = this.props;

    const { id } = match.params;

    const item = items.id[id];
    let rendered = null;
    let title = null;
    if (item) {
      rendered = (
        <List
          itemsDelete={this.handleDelete}
          itemsDisable={this.handleDisable}
          itemsEnable={this.handleEnable}
          items={item.children}
          history={history}
        />
      );
      title = (
        <Typography variant="title">
          Taxonomy: {'"'}{item.type}{'"'}
        </Typography>
      );
    }

    return (
      <div>
        {title}
        {rendered}
        <Grid>
          <Button
            onClick={() => history.push(`/taxonomies/${id}/add`)}
            variant="contained"
          >
            Add new term
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
  itemFetch: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const TaxonomiesWithRouter = withRouter(Taxonomies);

export default TaxonomiesWithRouter;
