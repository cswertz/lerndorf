import {
  USERS_ITEM_FETCH_SUCCESS,
  USER_REGISTER_SUCCESS,
  USERS_DELETE_SUCCESS,
  USERS_FETCH_SUCCESS,
  USERS_EDIT_SUCCESS,
  USERS_FETCH,
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

const users = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
    case USERS_DELETE_SUCCESS:
    case USERS_EDIT_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        id: {},
        items: [],
      });
    }

    case USERS_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case USERS_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      ids[action.item.id] = action.item;

      return Object.assign({}, state, {
        fetching: false,
        id: ids,
      });
    }

    case USERS_FETCH_SUCCESS: {
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

export default users;
