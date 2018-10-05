import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../components/taxonomies/List';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
  },
});

class Taxonomies extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const {
      items,
      itemsFetch,
    } = this.props;

    if (!items.fetched && !items.fetching) {
      itemsFetch();
    }
  }

  componentDidUpdate() {
    const {
      items,
      itemsFetch,
    } = this.props;

    if (!items.fetched && !items.fetching) {
      itemsFetch();
    }
  }

  handleDelete(id) {
    const {
      itemsDelete,
    } = this.props;

    itemsDelete(id);
  }

  render() {
    const {
      items,
      classes,
      history,
    } = this.props;

    return (
      <div className={classes.container}>
        <List
          TaxonomiesDelete={this.handleDelete}
          items={items.items}
          history={history}
        />
        <Grid>
          <Button
            onClick={() => history.push('/taxonomies/add')}
            variant="contained"
          >
            Add new taxonomy
          </Button>
        </Grid>
      </div>
    );
  }
}

Taxonomies.propTypes = {
  itemsDelete: PropTypes.func.isRequired,
  itemsFetch: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const TaxonomiesWithRouter = withRouter(Taxonomies);

export default withStyles(styles)(TaxonomiesWithRouter);
