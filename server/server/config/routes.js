import users from '../routes/users';

const configRoutes = (app) => {
  app.get('/', (req, res) => {
    res.json({
      message: 'I am a server route and can also be hot reloaded!',
    });
  });

  app.use('/api/users', users);
};

export default configRoutes;
