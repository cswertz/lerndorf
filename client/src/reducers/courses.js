import { COURSES_ITEMS_FETCH_FAILED, COURSES_ITEMS_FETCH_SUCCESS } from '@actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  items: [],
};

const courses = (state = initialState, action) => {
  switch (action.type) {
    case COURSES_ITEMS_FETCH_FAILED: {
      return { ...state, fetched: true, fetching: false, items: [] };
    }

    case COURSES_ITEMS_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

export default courses;
