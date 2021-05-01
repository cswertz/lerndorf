import {
  ROLES_CAPABILITIES_UPDATE_SUCCESS,
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
    case ROLES_CAPABILITIES_UPDATE_SUCCESS:
    case ROLES_DELETE_SUCCESS:
    case ROLES_EDIT_SUCCESS:
    case ROLES_ADD_SUCCESS: {
      return { ...state, fetched: false, fetching: false, id: {}, items: [] };
    }

    case ROLES_ADD_FAILED: {
      const errors = {};
      action.errors.forEach((item) => {
        errors[item.param] = item.msg;
      });

      return {
        ...state,
        errors: {
          ...state.errors,
          add: {
            error: true,
            errorMessage: action.error,
            errors,
          },
        },
      };
    }

    case ROLES_FETCH: {
      return { ...state, fetched: false, fetching: true };
    }

    case ROLES_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      ids[action.item.id] = action.item;
      ids[action.item.id].children = action.children;

      return { ...state, fetching: false, id: ids };
    }

    case ROLES_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

export default roles;
