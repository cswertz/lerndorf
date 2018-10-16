import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import taxonomies from './taxonomies';
import languages from './languages';
import roles from './roles';
import user from './user';

const lerndorfApp = combineReducers({
  form: formReducer,
  taxonomies,
  languages,
  roles,
  user,
});

export default lerndorfApp;
