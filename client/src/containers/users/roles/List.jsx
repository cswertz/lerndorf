import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../../components/users/roles/List';

class Roles extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
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

  render() {
    const { items, history } = this.props;

    return (
      <div>
        <Typography variant="headline">Available roles</Typography>
        <List itemsDelete={this.handleDelete} items={items.items} history={history} />
        <Grid>
          <Button onClick={() => history.push('/users/roles/add')} variant="contained">
            Add new role
          </Button>
        </Grid>
      </div>
    );
  }
}

Roles.propTypes = {
  itemsDelete: PropTypes.func.isRequired,
  itemsFetch: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const RolesWithRouter = withRouter(Roles);

export default RolesWithRouter;
