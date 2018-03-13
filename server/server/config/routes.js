import capabilities from '../routes/capabilities';
import languages from '../routes/languages';
import users from '../routes/users';

const configRoutes = (app) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'I am a server route and can also be hot reloaded!',
    });
  });


  app.use('/api/capabilities', capabilities);
  app.use('/api/languages', languages);
  app.use('/api/users', users);
};

export default configRoutes;
