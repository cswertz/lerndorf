import {
  TEXTS_ITEM_FETCH_SUCCESS,
  TEXTS_DELETE_SUCCESS,
  TEXTS_FETCH_SUCCESS,
  TEXTS_EDIT_SUCCESS,
  TEXTS_ADD_SUCCESS,
  TEXTS_ADD_FAILED,
  TEXTS_FETCH,
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

const texts = (state = initialState, action) => {
  switch (action.type) {
    case TEXTS_DELETE_SUCCESS:
    case TEXTS_EDIT_SUCCESS:
    case TEXTS_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        id: {},
        items: [],
      });
    }

    case TEXTS_ADD_FAILED: {
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

    case TEXTS_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case TEXTS_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      ids[action.item.id] = action.item;

      return Object.assign({}, state, {
        fetching: false,
        id: ids,
      });
    }

    case TEXTS_FETCH_SUCCESS: {
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

export default texts;
