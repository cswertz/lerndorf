import { combineReducers } from 'redux';

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
  lerndorf,
});

export default lerndorfApp;
