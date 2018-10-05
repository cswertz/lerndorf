import {
  LANGUAGES_DELETE_SUCCESS,
  LANGUAGES_FETCH_SUCCESS,
  LANGUAGES_ADD_SUCCESS,
  LANGUAGES_ADD_FAILED,
  LANGUAGES_FETCH,
} from '../actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  languages: [],
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

const languages = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGES_DELETE_SUCCESS:
    case LANGUAGES_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
      });
    }

    case LANGUAGES_ADD_FAILED: {
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

    case LANGUAGES_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case LANGUAGES_FETCH_SUCCESS: {
      return Object.assign({}, state, {
        fetched: true,
        fetching: false,
        languages: action.languages,
      });
    }

    default:
      return state;
  }
};

export default languages;
