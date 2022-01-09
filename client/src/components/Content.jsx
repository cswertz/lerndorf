import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { textsItemFetch } from '@actions';
import EditBar from '@components/UI/EditBar';
import NavigationBar from '@components/UI/NavigationBar';

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  subtitle: {},
  title: {},
  content: {
    padding: theme.spacing(4, 0),
  },
}));

const Content = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const content = useSelector((state) => state.texts?.id[id]?.content);

  useEffect(() => {
    dispatch(textsItemFetch(id));
  }, [dispatch, id]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>{content}</div>

      <EditBar />
      <NavigationBar />
    </div>
  );
};

export default Content;
