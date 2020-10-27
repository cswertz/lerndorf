import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
  wrapper: {
    marginTop: '10px',
  },
});

const TaxonomyList = ({
  itemsDelete,
  classes,
  history,
  items,
}) => {
  let renderedItems = null;
  if (items.length > 0) {
    renderedItems = items.map(item => (
      <ListItem
        key={item.id}
        button
        component={Link}
        to={`/taxonomies/show/${item.id}`}
      >
        <ListItemText primary={`${item.type}`}/>
        <ListItemSecondaryAction>
          <IconButton aria-label="Show">
            <FolderIcon
              onClick={() => history.push(`/taxonomies/show/${item.id}`)}
            />
          </IconButton>
          <IconButton aria-label="Edit">
            <EditIcon
              onClick={() => history.push(`/taxonomies/edit/${item.id}`)}
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
    <div className={classes.wrapper}>
      <List dense={false}>
        {renderedItems}
      </List>
    </div>
  );
};

TaxonomyList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
  itemsDelete: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(TaxonomyList);
