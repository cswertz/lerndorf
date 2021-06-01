import { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

const Content = () => {
  const classes = useStyles();

  const getContent = useCallback(async () => {
    // TODO: get content from API
    const response = await Promise.resolve('test content');
    console.log('response', response);
  }, []);

  useEffect(() => {
    getContent();
  }, [getContent]);

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.subtitle} variant="subtitle1">
        Welcome to LMS
      </Typography>

      <Typography className={classes.title} variant="h3">
        Orientation Headline
      </Typography>

      <Typography className={classes.content} variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus euismod sed eu metus lorem
        congue. In faucibus leo, pellentesque pharetra elementum nibh nunc dui. Fringilla habitant
        ipsum tempus, faucibus. In mattis vitae pellentesque iaculis etiam diam commodo risus
        aliquet. Eu massa nisi aliquam integer.
        <br />
        <br />
        Accumsan iaculis vulputate tellus sed in cras. Vitae purus phasellus augue donec. Quis et
        neque urna dapibus eu.Iaculis in nascetur ut faucibus ridiculus ac ultricies malesuada. Non
        non turpis ut nunc. At ullamcorper leo integer fermentum lectus nam arcu ut. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Rhoncus euismod sed eu metus lorem congue. In
        faucibus leo, pellentesque pharetra elementum nibh nunc dui. Fringilla habitant ipsum
        teLorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus euismod sed eu metus
        lorem congue. In faucibus leo, pellentesque pharetra elementum nibh nunc dui. Fringilla
        habitant ipsum tempus, faucibus. In mattis vitae pellentesque iaculis etiam diam commodo
        risus aliquet. Eu massa nisi aliquam integer. Accumsan iaculis vulputate tellus sed in cras.
        Vitae purus phasellus augue donec. Quis et neque urna dapibus eu.Iaculis in nascetur ut
        faucibus ridiculus ac ultricies malesuada.
        <br />
        <br />
        Non non turpis ut nunc. At ullamcorper leo integer fermentum lectus nam arcu ut. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Rhoncus euismod sed eu metus lorem congue. In
        faucibus leo, pellentesque pharetra elementum nibh nunc dui. Fringilla habitant ipsum
        teLorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus euismod sed eu metus
        lorem congue. In faucibus leo, pellentesque pharetra elementum nibh nunc dui. Fringilla
        habitant ipsum tempus, faucibus. In mattis vitae pellentesque iaculis etiam diam commodo
        risus aliquet. Eu massa nisi aliquam integer. Accumsan iaculis vulputate tellus sed in cras.
        Vitae purus phasellus augue donec. Quis et neque urna dapibus eu.Iaculis in nascetur ut
        faucibus ridiculus ac ultricies malesuada. Non non turpis ut nunc. At ullamcorper leo
        integer fermentum lectus nam arcu ut.
      </Typography>

      <EditBar />
      <NavigationBar />
    </div>
  );
};

export default Content;
