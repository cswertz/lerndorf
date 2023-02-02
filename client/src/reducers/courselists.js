import {
  COURSE_LIST_FETCH_SUCCESS,
  COURSE_LIST_FETCH_FAILED,
  COURSE_LISTS_FETCH_SUCCESS,
  COURSE_LISTS_FETCH_FAILED,
} from '@actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  items: [],
};

const initialStateSingle = {
  fetching: false,
  fetched: false,
  item: null,
};

const courselists = (state = initialState, action) => {
  switch (action.type) {
    case COURSE_LISTS_FETCH_FAILED: {
      return { ...state, fetched: true, fetching: false, items: [] };
    }

    case COURSE_LISTS_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

const courselist = (state = initialStateSingle, action) => {
  switch (action.type) {
    case COURSE_LIST_FETCH_FAILED: {
      return { ...state, fetched: true, fetching: false, item: null };
    }

    case COURSE_LIST_FETCH_SUCCESS: {
      const courseItem = action.item;
      return { ...state, fetched: true, fetching: false, item: action.item };
    }

    default:
      return state;
  }
};

export { courselists, courselist };
