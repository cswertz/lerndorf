import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

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

  return (
    <List className={classes.root} component="nav" aria-labelledby="nested-list">
      <ListItem button divider component={Link} to="/learning-units">
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

      <ListItem button divider component={Link} to="/content/1">
        <ListItemText primary="Meine Inhalte" />
        <ArrowRightIcon />
      </ListItem>

      <AdminMenu />
    </List>
  );
};

export default MainMenu;
