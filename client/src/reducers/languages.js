import {
  LANGUAGES_DELETE_SUCCESS,
  LANGUAGES_FETCH_SUCCESS,
  LANGUAGES_EDIT_SUCCESS,
  LANGUAGES_ADD_SUCCESS,
  LANGUAGES_ADD_FAILED,
  LANGUAGES_FETCH,
} from '@actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  languages: [],
  id: {},
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
    case LANGUAGES_EDIT_SUCCESS:
    case LANGUAGES_ADD_SUCCESS: {
      return { ...state, fetched: false, fetching: false };
    }

    case LANGUAGES_ADD_FAILED: {
      const errors = {};
      action.errors.forEach((item) => {
        errors[item.param] = item.msg;
      });

      return {
        ...state,
        errors: {
          ...state.errors,
          add: {
            error: true,
            errorMessage: action.error,
            errors,
          },
        },
      };
    }

    case LANGUAGES_FETCH: {
      return { ...state, fetched: false, fetching: true };
    }

    case LANGUAGES_FETCH_SUCCESS: {
      const ids = {};

      action.languages.forEach((item) => {
        ids[item.id] = item;
      });

      return { ...state, fetched: true, fetching: false, languages: action.languages, id: ids };
    }

    default:
      return state;
  }
};

export default languages;
