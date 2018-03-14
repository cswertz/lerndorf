import learningUnits from '../routes/learningUnits';
import capabilities from '../routes/capabilities';
import taxonomies from '../routes/taxonomies';
import languages from '../routes/languages';
import users from '../routes/users';
import files from '../routes/files';

const configRoutes = (app) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'I am a server route and can also be hot reloaded!',
    });
  });

  app.use('/api/learningUnits', learningUnits);
  app.use('/api/capabilities', capabilities);
  app.use('/api/taxonomies', taxonomies);
  app.use('/api/languages', languages);
  app.use('/api/users', users);
  app.use('/api/files', files);
};

export default configRoutes;
