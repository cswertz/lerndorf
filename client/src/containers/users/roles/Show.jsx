import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from '../../../components/users/roles/Show';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

class RolesShow extends Component {
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

  render() {
    const {
      classes,
      items,
      match,
    } = this.props;

    const { id } = match.params;
    const item = items.id[id];
    if (!item) return null;

    return (
      <div className={classes.container}>
        <Show
          item={item}
        />
      </div>
    );
  }
}

RolesShow.propTypes = {
  classes: PropTypes.shape({}).isRequired,
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

const RolesShowWithRouter = withRouter(RolesShow);

export default withStyles(styles)(RolesShowWithRouter);
