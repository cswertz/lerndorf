import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import languages from './languages';
import user from './user';

const lerndorfApp = combineReducers({
  form: formReducer,
  languages,
  user,
});

export default lerndorfApp;
