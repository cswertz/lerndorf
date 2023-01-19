import {
  COURSES_ITEMS_FETCH_FAILED,
  COURSES_ITEMS_FETCH_SUCCESS,
  COURSES_ITEM_FETCH_SUCCESS,
  COURSES_ITEM_FETCH_FAILED,
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

const course = (state = initialStateSingle, action) => {
  switch (action.type) {
    case COURSES_ITEM_FETCH_FAILED: {
      return { ...state, fetched: true, fetching: false, item: null };
    }

    case COURSES_ITEM_FETCH_SUCCESS: {
      const courseItem = action.item;
      courseItem.enrolmentStart = courseItem.enrolmentStart
        .toString()
        .substr(0, 'YYYY-MM-DD'.length);
      courseItem.enrolmentEnd = courseItem.enrolmentEnd.toString().substr(0, 'YYYY-MM-DD'.length);

      return { ...state, fetched: true, fetching: false, item: action.item };
    }

    default:
      return state;
  }
};

export { courses, course };
