import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';

import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({});

const RolesList = ({
  itemsDelete,
  history,
  items,
}) => {
  let renderedItems = null;
  if (items.length > 0) {
    renderedItems = items.map(item => (
      <ListItem key={item.id}>
        <ListItemText
          primary={`${item.name}`}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Show">
            <VisibilityIcon
              onClick={() => history.push(`/users/roles/show/${item.id}`)}
            />
          </IconButton>
          <IconButton aria-label="Edit">
            <EditIcon
              onClick={() => history.push(`/users/roles/edit/${item.id}`)}
            />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon
              onClick={() => itemsDelete(item.id)}
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  return (
    <div>
      <List dense={false}>
        {renderedItems}
      </List>
    </div>
  );
};

RolesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
  itemsDelete: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(RolesList);
