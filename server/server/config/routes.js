import knowledgeUnits from '../routes/knowledgeUnits';
import learningUnits from '../routes/learningUnits';
import capabilities from '../routes/capabilities';
import taxonomies from '../routes/taxonomies';
import languages from '../routes/languages';
import users from '../routes/users';
import files from '../routes/files';
import texts from '../routes/texts';
import roles from '../routes/roles';
import path from 'path';

const configRoutes = (app) => {
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(process.cwd(), 'build') });
  });

  app.use('/api/knowledgeUnits', knowledgeUnits);
  app.use('/api/learningUnits', learningUnits);
  app.use('/api/capabilities', capabilities);
  app.use('/api/taxonomies', taxonomies);
  app.use('/api/languages', languages);
  app.use('/api/users', users);
  app.use('/api/files', files);
  app.use('/api/texts', texts);
  app.use('/api/roles', roles);
};

export default configRoutes;
