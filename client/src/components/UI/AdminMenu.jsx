import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { userFetchRoles } from '@actions';
import { hasCapability } from '@utils/user';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedListHeader: {
    // '&.is-open': {
    //   background: theme.palette.primary.light,
    // },
  },
  nestedList: {
    // '&.is-open': {
    //   background: theme.palette.primary.light,
    // },
  },
}));

const AdminMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState({
    administration: false,
    authoring: false,
  });

  useEffect(() => {
    if (
      user?.loggedIn === true &&
      !user.fetchingRoles &&
      !user.fetchedRoles &&
      user.user.username !== 'Guest'
    ) {
      dispatch(userFetchRoles(user.user.id));
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

      {hasCapability(user.capabilities, [
        'edit_user',
        'edit_language',
        'edit_taxonomy',
        'edit_user',
      ]) && (
        <>
          <ListItem button divider onClick={(event) => handleClick(event, 'administration')}>
            <ListItemText primary="Administration" />
            {open.administration ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </ListItem>
          <Collapse in={open.administration} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {hasCapability(user.capabilities, ['edit_language']) && (
                <ListItem
                  button
                  divider
                  className={classes.nested}
                  component={Link}
                  to="/languages"
                >
                  <ListItemText primary="Manage Languages" />
                </ListItem>
              )}
              {hasCapability(user.capabilities, ['edit_taxonomy']) && (
                <ListItem
                  button
                  divider
                  className={classes.nested}
                  component={Link}
                  to="/taxonomies"
                >
                  <ListItemText primary="Manage Taxonomies" />
                </ListItem>
              )}
              {hasCapability(user.capabilities, ['edit_role']) && (
                <ListItem
                  button
                  divider
                  className={classes.nested}
                  component={Link}
                  to="/users/roles"
                >
                  <ListItemText primary="Manage Roles" />
                </ListItem>
              )}
              {hasCapability(user.capabilities, ['edit_user']) && (
                <ListItem button divider className={classes.nested} component={Link} to="/users">
                  <ListItemText primary="Manage Users" />
                </ListItem>
              )}
              {hasCapability(user.capabilities, ['view_user_logs']) && (
                <ListItem button divider className={classes.nested} component={Link} to="/logs">
                  <ListItemText primary="Logs" />
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
              <ListItem button className={classes.nested} component={Link} to="/learning-units/add">
                <ListItemText inset primary="Add Learning Unit" />
              </ListItem>
            </List>
          </Collapse>
        </>
      )} */}
    </>
  );
};

export default AdminMenu;
