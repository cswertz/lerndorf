import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import knowledgeUnits from './knowledgeUnits';
import learningUnits from './learningUnits';
import capabilities from './capabilities';
import taxonomies from './taxonomies';
import languages from './languages';
import roles from './roles';
import users from './users';
import texts from './texts';
import user from './user';
import logs from './logs';

const lerndorfApp = combineReducers({
  form: formReducer,
  knowledgeUnits,
  learningUnits,
  capabilities,
  taxonomies,
  languages,
  roles,
  users,
  texts,
  user,
  logs,
});

export default lerndorfApp;
