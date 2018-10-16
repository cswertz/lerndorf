import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {};

const RolesShow = ({
  item,
}) => {
  const capabilities = item.Capabilities.map(role => (
    <ListItem key={role.id}>
      <ListItemText
        primary={`${role.name}`}
      />
    </ListItem>
  ));

  return (
    <div>
      {item.name}
      <List dense>
        {capabilities}
      </List>
    </div>
  );
};

RolesShow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(RolesShow);
