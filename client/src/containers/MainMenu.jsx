import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { userLogout } from '@actions';
import AdminMenu from '@components/UI/AdminMenu';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const MainMenu = () => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const [courseLists, setCourseLists] = useState([]);

  const handleLogout = () => {
    dispatch(userLogout(history));
    history.push('/');
  };

  useEffect(() => {
    if (courseLists.length > 0) {
      return;
    }
    fetch(`/api/courselists`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((result) => {
        setCourseLists(result);
      });
  }, [courseLists]);

  return (
    <List className={classes.root} component="nav" aria-labelledby="nested-list">
      <ListItem button divider component={Link} to="/courses/my">
        <ListItemText primary="My Courses" />
        <ArrowRightIcon />
      </ListItem>

      {courseLists !== undefined &&
        courseLists.length > 0 &&
        courseLists.map((courseList) => {
          return (
            <ListItem
              key={`course-${courseList.id}`}
              button
              divider
              component={Link}
              to={`/courses/lists/${courseList.id}`}
            >
              <ListItemText primary={courseList.title} />
              <ArrowRightIcon />
            </ListItem>
          );
        })}

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
