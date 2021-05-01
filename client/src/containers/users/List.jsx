import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../../components/users/List';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

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
    const { items, classes, history } = this.props;

    return (
      <div className={classes.container}>
        <List itemsDelete={this.handleDelete} items={items.items} history={history} />
      </div>
    );
  }
}

Roles.propTypes = {
  itemsDelete: PropTypes.func.isRequired,
  itemsFetch: PropTypes.func.isRequired,
  items: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const RolesWithRouter = withRouter(Roles);

export default withStyles(styles)(RolesWithRouter);
