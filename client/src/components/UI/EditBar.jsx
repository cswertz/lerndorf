import { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import GetAppIcon from '@material-ui/icons/GetApp';

import EditContentDialog from '@components/UI/EditContentDialog';

// Dummy Crosslinks
const crosslinks = [
  { text: 'Crosslink 1', link: '/test' },
  { text: 'Crosslink 2', link: '/test' },
  { text: 'Crosslink 3', link: '/test' },
];

const useStyles = makeStyles((theme) => ({
  wrapper: {
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  actions: {
    display: 'flex',
  },
  actionsItem: {
    display: 'flex',
    alignItems: 'center',

    '&:not(:last-child)': { marginRight: theme.spacing(2) },
  },
  links: {
    display: 'flex',

    [theme.breakpoints.up('lg')]: {
      marginLeft: 'auto',
    },
  },
  linksItem: {
    color: theme.palette.common.black,
    display: 'block',
  },
  separator: {
    margin: theme.spacing(0, 2),
  },
}));

const EditBar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [showEditModal, setShowEditModal] = useState(false);

  const downloadCSV = () => {
    console.log('download CSV');
  };

  return (
    <div className={classes.wrapper}>
      {user.loggedIn && (
        <div className={classes.actions}>
          <Link className={classes.actionsItem} onClick={() => setShowEditModal(true)}>
            Edit Content <ArrowDropDownIcon />
          </Link>

          <Link className={classes.actionsItem} type="button" onClick={downloadCSV}>
            {/* <GetAppIcon /> */}
            Download as .csv
          </Link>
        </div>
      )}

      <div className={classes.links}>
        {crosslinks.map((crosslink, index) => (
          <Fragment key={crosslink.text}>
            <Link className={classes.linksItem} to={crosslink.link}>
              {crosslink.text}
            </Link>
            {index !== crosslinks.length - 1 && <div className={classes.separator}>–</div>}
          </Fragment>
        ))}
      </div>

      <EditContentDialog open={showEditModal} onClose={() => setShowEditModal(false)} />
    </div>
  );
};

export default EditBar;
