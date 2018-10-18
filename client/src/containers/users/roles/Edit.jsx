import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Capabilities from '../../../components/users/roles/Capabilities';
import EditForm from '../../../components/users/roles/EditForm';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

class RolesEdit extends Component {
  constructor(props) {
    super(props);

    this.removeCapability = this.removeCapability.bind(this);
    this.addCapability = this.addCapability.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      capabilities,
      capabilitiesFetch,
    } = this.props;

    if ((!capabilities.fetching) && (!capabilities.fetched)) {
      capabilitiesFetch();
    }
  }

  componentDidUpdate() {
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

  addCapability(e, capability) {
    e.preventDefault();

    const {
      match,
      addCapability,
    } = this.props;
    const { id } = match.params;

    addCapability(id, capability);
  }

  removeCapability(e, capability) {
    e.preventDefault();

    const {
      match,
      removeCapability,
    } = this.props;
    const { id } = match.params;

    removeCapability(id, capability);
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
      name: e.target.name.value,
    };

    handleSubmit(id, data, history);
  }

  render() {
    const {
      capabilities,
      classes,
      errors,
      items,
      match,
    } = this.props;

    const { id } = match.params;
    const item = items.id[id];
    if (!item || !capabilities.fetched) return null;

    const availableIds = item.Capabilities.map(capability => capability.id);

    const owned = capabilities.items.filter(capability => availableIds.indexOf(capability.id) > -1);
    const available = capabilities.items
      .filter(capability => availableIds.indexOf(capability.id) < 0);

    return (
      <div className={classes.container}>
        <EditForm
          handleSubmit={this.handleSubmit}
          initialValues={item}
          errors={errors.edit}
        />
        <Capabilities
          remove={this.removeCapability}
          add={this.addCapability}
          available={available}
          owned={owned}
        />
      </div>
    );
  }
}

RolesEdit.propTypes = {
  capabilitiesFetch: PropTypes.func.isRequired,
  capabilities: PropTypes.shape({}).isRequired,
  removeCapability: PropTypes.func.isRequired,
  addCapability: PropTypes.func.isRequired,
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

const RolesEditWithRouter = withRouter(RolesEdit);

export default withStyles(styles)(RolesEditWithRouter);
