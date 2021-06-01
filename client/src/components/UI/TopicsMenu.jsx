import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SvgIcon from '@material-ui/core/SvgIcon';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

// dummy menu structure
const topics = [
  {
    id: 1,
    title: 'Topic 1',
    items: [
      { id: '1-1', title: 'Course 1' },
      {
        id: '1-2',
        title: 'Course 2',
        items: [
          { id: '1-2-1', title: 'Content 1' },
          { id: '1-2-2', title: 'Content 2' },
          { id: '1-2-3', title: 'Content 3' },
          { id: '1-2-4', title: 'Content 4' },
        ],
      },
      { id: '1-3', title: 'Course 3' },
      { id: '1-4', title: 'Course 4' },
    ],
  },
  {
    id: 2,
    title: 'Topic 2',
    items: [
      { id: '2-1', title: 'Course 1' },
      {
        id: '2-2',
        title: 'Course 2',
        items: [
          { id: '2-2-1', title: 'Content 1' },
          { id: '2-2-2', title: 'Content 2' },
          { id: '2-2-3', title: 'Content 3' },
          { id: '2-2-4', title: 'Content 4' },
        ],
      },
      { id: '2-3', title: 'Course 3' },
      { id: '2-4', title: 'Course 4' },
    ],
  },
  {
    id: 3,
    title: 'Topic 3',
    items: [
      { id: '3-1', title: 'Course 1' },
      {
        id: '3-2',
        title: 'Course 2',
        items: [
          { id: '3-2-1', title: 'Content 1' },
          { id: '3-2-2', title: 'Content 2' },
          { id: '3-2-3', title: 'Content 3' },
          { id: '3-2-4', title: 'Content 4' },
        ],
      },
      { id: '3-3', title: 'Course 3' },
      { id: '3-4', title: 'Course 4' },
    ],
  },
  {
    id: 4,
    title: 'Topic 4',
    items: [
      { id: '4-1', title: 'Course 1' },
      {
        id: '4-2',
        title: 'Course 2',
        items: [
          { id: '4-2-1', title: 'Content 1' },
          { id: '4-2-2', title: 'Content 2' },
          { id: '4-2-3', title: 'Content 3' },
          { id: '4-2-4', title: 'Content 4' },
        ],
      },
      { id: '4-3', title: 'Course 3' },
      { id: '4-4', title: 'Course 4' },
    ],
  },
];

function TreeIcon(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 9, height: 4 }} viewBox="0 0 9 4" {...props}>
      <line x1="1" y1="3.5" x2="9" y2="3.5" stroke="black" />
      <line x1="0.5" y1="4" x2="0.5" stroke="black" />
    </SvgIcon>
  );
}

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
  nestedListIcon: {
    marginLeft: 10,
    minWidth: 14,
  },
}));

const ContentMenuItem = ({ item }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <ListItem
        button
        className={classes.nested}
        onClick={item.items?.length > 0 ? handleClick : null}
        component={item.items?.length > 0 ? 'div' : Link}
        to={item.items?.length > 0 ? null : `/course/${item.id}`}
      >
        <ListItemText primary={item.title} />
        {item.items?.length > 0 && <>{open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</>}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          className={`${classes.nestedList} ${open && 'is-open'}`}
          component="div"
          dense
          disablePadding
        >
          {item.items?.length > 0 &&
            item.items.map((subItem) => (
              <ListItem
                key={subItem.id}
                className={classes.nested}
                button
                component={Link}
                to={`/content/${item.id}`}
              >
                <ListItemIcon className={classes.nestedListIcon}>
                  <TreeIcon />
                </ListItemIcon>
                <ListItemText primary={subItem.title} />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  );
};

const TopicMenuItem = ({ topic }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <ListItem
        className={`${classes.nestedListHeader} ${open && 'is-open'}`}
        button
        divider={!open}
        onClick={handleClick}
      >
        <ListItemText primary={topic.title} />
        {topic.items?.length > 0 && <>{open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}</>}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          className={`${classes.nestedList} ${open && 'is-open'}`}
          component="div"
          dense
          disablePadding
        >
          {topic.items?.length > 0 &&
            topic.items.map((item) => <ContentMenuItem key={item.id} item={item} />)}
        </List>
      </Collapse>
    </>
  );
};

const TopicsMenu = () => {
  const classes = useStyles();

  return (
    <List className={classes.root} component="nav" aria-labelledby="nested-list">
      {topics.map((topic) => (
        <TopicMenuItem key={topic.id} topic={topic} />
      ))}
    </List>
  );
};

export default TopicsMenu;
