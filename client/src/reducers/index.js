import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import learningUnits from './learningUnits';
import capabilities from './capabilities';
import taxonomies from './taxonomies';
import languages from './languages';
import roles from './roles';
import users from './users';
import user from './user';

const lerndorfApp = combineReducers({
  form: formReducer,
  learningUnits,
  capabilities,
  taxonomies,
  languages,
  roles,
  users,
  user,
});

export default lerndorfApp;
