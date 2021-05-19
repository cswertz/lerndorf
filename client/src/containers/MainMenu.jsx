import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import { hasCapability } from '@utils/user';

const useStyles = makeStyles((theme) => {
  // nested: {},
});

function MainMenu({ user, fetchRoles }) {
  const classes = useStyles();

  const [open, setOpen] = useState({
    administration: false,
    authoring: false,
  });

  useEffect(() => {
    if (!user.fetchingRoles && !user.fetchedRoles && user.user.username !== 'Guest') {
      fetchRoles(user.user.id);
    }
  });

  const handleClick = (event, item) => {
    event.stopPropagation();
    setOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }));
  };

  // const handleClose = () => {
  //   setOpen({
  //     administration: false,
  //     authoring: false,
  //   });
  // };

  return (
    <>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}

      {/* <List>
        <ListItem button component={Link} to="/learning-units">
          Learning Units
        </ListItem>
      </List> */}

      <List>
        {hasCapability(user.capabilities, [
          'edit_user',
          'edit_language',
          'edit_taxonomy',
          'edit_user',
        ]) && (
          <>
            <ListItem button divider onClick={(event) => handleClick(event, 'administration')}>
              <ListItemText primary="Administration" />
              {open.administration ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open.administration}>
              <List component="div" disablePadding>
                {hasCapability(user.capabilities, ['edit_language']) && (
                  <ListItem button className={classes.nested} component={Link} to="/languages">
                    <ListItemText inset primary="Manage Languages" />
                  </ListItem>
                )}
                {hasCapability(user.capabilities, ['edit_taxonomy']) && (
                  <ListItem button className={classes.nested} component={Link} to="/taxonomies">
                    <ListItemText inset primary="Manage Taxonomies" />
                  </ListItem>
                )}
                {hasCapability(user.capabilities, ['edit_role']) && (
                  <ListItem button className={classes.nested} component={Link} to="/users/roles">
                    <ListItemText inset primary="Manage Roles" />
                  </ListItem>
                )}
                {hasCapability(user.capabilities, ['edit_user']) && (
                  <ListItem button className={classes.nested} component={Link} to="/users">
                    <ListItemText inset primary="Manage Users" />
                  </ListItem>
                )}
                {hasCapability(user.capabilities, ['view_user_logs']) && (
                  <ListItem button className={classes.nested} component={Link} to="/logs">
                    <ListItemText inset primary="Logs" />
                  </ListItem>
                )}
              </List>
            </Collapse>
          </>
        )}

        {/* {hasCapability(user.capabilities, ['add_learning_unit']) && (
          <>
            <ListItem button divider onClick={(event) => handleClick(event, 'authoring')}>
              <ListItemText primary="Authoring" />
              {open.authoring ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open.authoring}>
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/learning-units/add"
                >
                  <ListItemText inset primary="Add Learning Unit" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )} */}
      </List>
    </>
  );
}

MainMenu.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  fetchRoles: PropTypes.func.isRequired,
};

export default MainMenu;
