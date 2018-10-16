import {
  ROLES_ITEM_FETCH_SUCCESS,
  ROLES_DELETE_SUCCESS,
  ROLES_FETCH_SUCCESS,
  ROLES_EDIT_SUCCESS,
  ROLES_ADD_SUCCESS,
  ROLES_ADD_FAILED,
  ROLES_FETCH,
} from '../actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  items: [],
  errors: {
    add: {
      error: false,
      errorMessage: '',
      errors: {},
    },
    edit: {
      error: false,
      errorMessage: '',
      errors: {},
    },
  },
  id: {},
};

const roles = (state = initialState, action) => {
  switch (action.type) {
    case ROLES_DELETE_SUCCESS:
    case ROLES_EDIT_SUCCESS:
    case ROLES_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        id: {},
      });
    }

    case ROLES_ADD_FAILED: {
      const errors = {};
      action.errors.forEach((item) => {
        errors[item.param] = item.msg;
      });

      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, {
          add: {
            error: true,
            errorMessage: action.error,
            errors,
          },
        }),
      });
    }

    case ROLES_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case ROLES_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      ids[action.item.id] = action.item;
      ids[action.item.id].children = action.children;

      return Object.assign({}, state, {
        fetching: false,
        id: ids,
      });
    }

    case ROLES_FETCH_SUCCESS: {
      return Object.assign({}, state, {
        fetched: true,
        fetching: false,
        items: action.items,
      });
    }

    default:
      return state;
  }
};

export default roles;
