import { REHYDRATE } from 'redux-persist';

import {
  USER_ROLES_FETCH_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_LOGOUT_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_EDIT_SUCCESS,
  USER_LOGIN_FAILED,
  USER_ROLES_FETCH,
} from '../actions/constants';

const initialState = {
  loggedIn: false,
  user: {
    username: 'Guest',
    titlePrefix: '',
    titleSuffix: '',
    description: '',
    firstName: '',
    birthdate: '',
    lastName: '',
    studyId: '',
    country: '',
    website: '',
    picture: '',
    street: '',
    email: '',
    phone: '',
    city: '',
    zip: '',
  },
  fetchingRoles: false,
  fetchedRoles: false,
  capabilities: [],
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
    edit: {
      errorMessage: '',
      error: false,
      errors: {},
    },
  },
  menus: {
    user: {
      anchorEl: null,
    },
  },
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_ROLES_FETCH: {
      return Object.assign({}, state, {
        fetchingRoles: true,
        fetchedRoles: false,
      });
    }

    case USER_ROLES_FETCH_SUCCESS: {
      let capabilities = action.roles.Roles.map(
        role => role.Capabilities.map(capability => capability.slug),
      );
      capabilities = [].concat(...capabilities);

      return Object.assign({}, state, {
        fetchingRoles: false,
        fetchedRoles: true,
        capabilities,
      });
    }

    case USER_REGISTER_SUCCESS: {
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          registration: {
            error: false,
            errors: {},
          },
        }),
      });
    }

    case USER_LOGOUT_SUCCESS: {
      return Object.assign({}, initialState);
    }

    case USER_EDIT_SUCCESS:
    case USER_LOGIN_SUCCESS: {
      const current = action.user;
      if (current.birthdate) {
        [current.birthdate] = current.birthdate.split('T');
      }

      return Object.assign({}, state, {
        loggedIn: true,
        user: Object.assign({}, state.user, current),
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

    case REHYDRATE: {
      if (action.payload) {
        return Object.assign({}, action.payload.user, {
          fetchedRoles: false,
          fetchingRoles: false,
          capabilities: [],
        });
      }

      return state;
    }

    default:
      return state;
  }
};

export default user;
