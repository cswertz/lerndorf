import {
  FORUM_ITEMS_FETCH_SUCCESS,
  FORUM_ITEMS_FETCH_FAILED,
  THREAD_ITEM_FETCH_FAILED,
  THREAD_ITEM_FETCH_SUCCESS,
} from '@actions/constants';

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

const forum = (state = initialState, action) => {
  switch (action.type) {
    case FORUM_ITEMS_FETCH_FAILED: {
      return { ...state, fetched: true, fetching: false, items: [] };
    }

    case FORUM_ITEMS_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

export default forum;
