import {
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from '../actions/constants';

const initialState = {
  loggedIn: false,
  user: {
    username: 'Guest',
  },
  errors: {
    registration: {
      errorMessage: '',
      error: false,
      errors: {},
    },
    login: {
      errorMessage: '',
      error: false,
      errors: {},
    },
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        loggedIn: false,
      });
    }

    case USER_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user,
        errors: Object.assign({}, state.errors, {
          login: {
            error: false,
          },
        }),
      });
    }

    case USER_LOGIN_FAILED: {
      return Object.assign({}, state, {
        loggedIn: false,
        errors: Object.assign({}, state.errors, {
          login: {
            error: true,
            errorMessage: action.error,
          },
        }),
      });
    }

    case USER_REGISTER_FAILED: {
      const errors = {};
      action.errors.forEach((item) => {
        errors[item.param] = item.msg;
      });

      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          registration: {
            error: true,
            errorMessage: action.error,
            errors,
          },
        }),
      });
    }

    default:
      return state;
  }
};

export default user;
