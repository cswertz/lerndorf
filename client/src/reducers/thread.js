import {
  THREAD_ITEM_CREATE_SUCCESS,
  THREAD_ITEM_FETCH_FAILED,
  THREAD_ITEM_FETCH_SUCCESS,
} from '@actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  item: {},
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

const thread = (state = initialState, action) => {
  console.warn(action.type);
  switch (action.type) {
    case THREAD_ITEM_FETCH_FAILED: {
      return { ...state, fetched: true, fetching: false, item: {} };
    }
    case THREAD_ITEM_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, item: action?.item };
    }

    default:
      return state;
  }
};
export default thread;
