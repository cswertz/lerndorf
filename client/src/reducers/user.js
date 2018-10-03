import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_REGISTER_FAILED,
  USER_REGISTER_SUCCESS,
} from '../actions/constants';

const initialState = {
  user: {
    loggedIn: false,
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
    case LOGIN_SUCCESS: {
      console.log('Login success:', action);
      return Object.assign({}, state, {
        user: {
          loggedIn: true,
          username: action.username,
        },
        errors: {
          login: {
            error: false,
          },
        },
      });
    }

    case LOGIN_FAILED: {
      console.log('Login failed:', action);
      return Object.assign({}, state, {
        user: {
          loggedIn: false,
        },
        errors: {
          login: {
            error: true,
          },
        },
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
