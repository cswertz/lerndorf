import {
  LANGUAGES_FETCH_SUCCESS,
  LANGUAGES_FETCH,
} from '../actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  languages: [],
};

const languages = (state = initialState, action) => {
  switch (action.type) {
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
