import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({
  wrapper: {
    marginTop: '10px',
  },
});

const TaxonomyList = ({
  itemsDelete,
  itemsDisable,
  itemsEnable,
  classes,
  history,
  items,
}) => {
  let renderedItems = null;
  if (items.length > 0) {
    renderedItems = items.map((item) => (
      <ListItem
        key={item.id}
        button
        component={Link}
        to={`/taxonomies/show/${item.id}`}
      >
        <ListItemText primary={`${item.type}`} />
        <ListItemSecondaryAction>
          {!item.active && (
            <IconButton
              aria-label="Enable"
              title="Enable Term"
              onClick={() => itemsEnable(item.id)}
            >
              <DoneIcon />
            </IconButton>
          )}
          {item.active && (
            <IconButton
              aria-label="Disable"
              title="Disable Term"
              onClick={() => itemsDisable(item.id)}
            >
              <ClearIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Show"
            title="Show Children"
            onClick={() => history.push(`/taxonomies/show/${item.id}`)}
          >
            <FolderIcon />
          </IconButton>
          <IconButton
            aria-label="Edit"
            title="Edit"
            onClick={() => history.push(`/taxonomies/edit/${item.id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            title="Delete"
            onClick={() => itemsDelete(item.id)}
          >
            <DeleteIcon />
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
  itemsDisable: PropTypes.func.isRequired,
  itemsEnable: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(TaxonomyList);
