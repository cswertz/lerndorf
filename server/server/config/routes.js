import users from '../routes/users';

import capabilities from '../routes/capabilities';

const configRoutes = (app) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'I am a server route and can also be hot reloaded!',
    });
  });

  app.use('/api/users', users);
  app.use('/api/capabilities', capabilities);
};

export default configRoutes;
