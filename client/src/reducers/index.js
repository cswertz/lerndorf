import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import user from './user';

import {
  LOGIN,
  LOGOUT,
} from '../actions/constants';

function lerndorf(state = [], action) {
  switch (action.type) {
    case LOGIN: {
      return state;
    }

    case LOGOUT: {
      return state;
    }

    default: {
      return state;
    }
  }
}

const lerndorfApp = combineReducers({
  form: formReducer,
  lerndorf,
  user,
});

export default lerndorfApp;
