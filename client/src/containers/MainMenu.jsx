import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// import { userFetchRoles } from '@actions';
// import { hasCapability } from '@utils/user';
import AdminMenu from '@components/UI/AdminMenu';
import Badge from '@components/UI/Badge';

const StyledBadge = withStyles(() => ({
  badge: {
    right: -13,
    top: 15,
  },
}))(Badge);

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

const MainMenu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState({
    courses: false,
  });

  const handleClick = (event, item) => {
    event.stopPropagation();
    setOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }));
  };

  return (
    <List className={classes.root} component="nav" aria-labelledby="nested-list">
      <ListItem
        className={`${classes.nestedListHeader} ${open.courses && 'is-open'}`}
        button
        divider={!open.courses}
        onClick={(event) => handleClick(event, 'courses')}
      >
        <ListItemText primary="My Courses" />
        {open.courses ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
      </ListItem>
      <Collapse in={open.courses} timeout="auto" unmountOnExit>
        <List
          className={`${classes.nestedList} ${open.courses && 'is-open'}`}
          component="div"
          disablePadding
        >
          <ListItem button className={classes.nested} component={Link} to="/learning-units">
            <ListItemText primary="Course Overview" />
          </ListItem>
          <ListItem button className={classes.nested} component={Link} to="/course/create">
            <ListItemText primary="Create Course" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button divider component={Link} to="/learning-units" disabled>
        <ListItemText primary="Meine Aufgaben" />
        <ArrowRightIcon />
      </ListItem>
      <ListItem button divider component={Link} to="/messages">
        <StyledBadge badgeContent={4}>
          <ListItemText primary="Meine Nachrichten" />
        </StyledBadge>
      </ListItem>
      <ListItem button divider component={Link} to="/content/1">
        <ListItemText primary="Meine Inhalte" />
        <ArrowRightIcon />
      </ListItem>

      <AdminMenu />
    </List>
  );
};

export default MainMenu;
