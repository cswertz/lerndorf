import {
  TAXONOMIES_DELETE_SUCCESS,
  TAXONOMIES_FETCH_SUCCESS,
  TAXONOMIES_EDIT_SUCCESS,
  TAXONOMIES_ADD_SUCCESS,
  TAXONOMIES_ADD_FAILED,
  TAXONOMIES_FETCH,
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

const taxonomies = (state = initialState, action) => {
  switch (action.type) {
    case TAXONOMIES_DELETE_SUCCESS:
    case TAXONOMIES_EDIT_SUCCESS:
    case TAXONOMIES_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
      });
    }

    case TAXONOMIES_ADD_FAILED: {
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

    case TAXONOMIES_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case TAXONOMIES_FETCH_SUCCESS: {
      const ids = {};

      action.items.forEach((item) => {
        ids[item.id] = item;
      });

      return Object.assign({}, state, {
        fetched: true,
        fetching: false,
        items: action.items,
        id: ids,
      });
    }

    default:
      return state;
  }
};

export default taxonomies;
