import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { userLogout } from '@actions';
import AdminMenu from '@components/UI/AdminMenu';
// import Badge from '@components/UI/Badge';

// const StyledBadge = withStyles(() => ({
//   badge: {
//     right: -13,
//     top: 15,
//   },
// }))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const MainMenu = () => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout(history));
    history.push('/');
  };

  return (
    <List className={classes.root} component="nav" aria-labelledby="nested-list">
      {/* <ListItem button divider component={Link} to="/knowledge-units">
            <ListItemText primary="Knowledge base" />
            <ArrowRightIcon />
      </ListItem> */}

      <ListItem button divider component={Link} to="/courses/my">
        <ListItemText primary="My Courses" />
        <ArrowRightIcon />
      </ListItem>

      {/* <ListItem button divider component={Link} to="/learning-units">
        <ListItemText primary="Meine Aufgaben" />
        <ArrowRightIcon />
      </ListItem> */}

      {/* <ListItem button divider component={Link} to="/messages">
        <StyledBadge badgeContent={4}>
          <ListItemText primary="Meine Nachrichten" />
        </StyledBadge>
      </ListItem> */}

      <ListItem button divider component={Link} to="/learning-units">
        <ListItemText primary="Learning Units" />
        <ArrowRightIcon />
      </ListItem>

      <ListItem button divider component={Link} to="/users/user/edit">
        <ListItemText primary="Settings" />
        <ArrowRightIcon />
      </ListItem>

      <ListItem button divider component={Link} to="/users/user/languages">
        <ListItemText primary="Languages" />
        <ArrowRightIcon />
      </ListItem>

      <AdminMenu />

      <ListItem button divider component={Link} to="/threads">
        <ListItemText primary="Forum" />
        <ArrowRightIcon />
      </ListItem>

      <ListItem button onClick={handleLogout}>
        <ListItemText primary="Logout" />
        <ArrowRightIcon />
      </ListItem>
    </List>
  );
};

export default MainMenu;
