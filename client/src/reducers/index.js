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
import forum from './forum';
import thread from './thread';
import { course, courses } from './courses';

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
  forum,
  thread,
  courses,
  course,
});

export default lerndorfApp;
