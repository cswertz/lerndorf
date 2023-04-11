import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SvgIcon from '@material-ui/core/SvgIcon';
import Collapse from '@material-ui/core/Collapse';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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

const ContentMenuItem = ({ item, prefix, history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen((prevState) => !prevState);
    console.error('TSET');
  };

  const openLink = () => {
    setTimeout(() => {
      history.push(`/${prefix}/${item.id}`);
    }, 10);
  };

  return (
    <>
      <ListItem
        button
        className={classes.nested}
        onClick={item.items?.length > 0 ? handleClick : openLink}
        component={item.items?.length > 0 ? 'div' : Link}
        to={item.items?.length > 0 ? null : `/${prefix}`}
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
                to={`${subItem.href}`}
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

const TopicMenuItem = ({ topic, prefix }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();

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
            topic.items.map((item) => (
              <ContentMenuItem key={item.id} item={item} prefix={prefix} history={history} />
            ))}
        </List>
      </Collapse>
    </>
  );
};

const TopicsMenu = (props) => {
  const classes = useStyles();

  const { nav, prefix } = props;

  if (nav === undefined || prefix === undefined) {
    return '';
  }

  return (
    <>
      <List className={classes.root} component="nav" aria-labelledby="nested-list">
        {[...nav].map((topic) => (
          <TopicMenuItem key={topic.id} topic={topic} prefix={prefix} />
        ))}
      </List>
    </>
  );
};

export default TopicsMenu;
