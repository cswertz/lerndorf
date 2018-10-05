import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import taxonomies from './taxonomies';
import languages from './languages';
import user from './user';

const lerndorfApp = combineReducers({
  form: formReducer,
  taxonomies,
  languages,
  user,
});

export default lerndorfApp;
