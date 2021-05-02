import { LOGS_FETCH_SUCCESS, LOGS_FETCH } from '@actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  filters: {
    userId: null,
    courseId: null,
    languageId: 1,
    learningUnitId: null,
    knowledgeUnitId: null,
  },
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
};

const logs = (state = initialState, action) => {
  switch (action.type) {
    case LOGS_FETCH: {
      return { ...state, fetched: false, fetching: true };
    }

    case LOGS_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

export default logs;
