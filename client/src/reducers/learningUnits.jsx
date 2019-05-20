import {
  LEARNINGUNITS_SUGGESTIONS_FETCH_SUCCESS,
  LEARNINGUNITS_TAXONOMIES_FETCH_SUCCESS,
  LEARNINGUNITS_ITEM_FETCH_SUCCESS,
  LEARNINGUNITS_DELETE_SUCCESS,
  LEARNINGUNITS_FETCH_SUCCESS,
  KNOWLEDGEUNITS_EDIT_SUCCESS,
  LEARNINGUNITS_EDIT_SUCCESS,
  KNOWLEDGEUNITS_ADD_SUCCESS,
  LEARNINGUNITS_ADD_SUCCESS,
  LEARNINGUNITS_ADD_FAILED,
  LEARNINGUNITS_FETCH,
  TEXTS_EDIT_SUCCESS,
  TEXTS_ADD_SUCCESS,
} from '../actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  items: [],
  suggestions: [],
  taxonomies: {
    fetching: false,
    fetched: false,
    items: {
      relationType: [],
    },
  },
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

const learningUnits = (state = initialState, action) => {
  switch (action.type) {
    case LEARNINGUNITS_DELETE_SUCCESS:
    case KNOWLEDGEUNITS_EDIT_SUCCESS:
    case KNOWLEDGEUNITS_ADD_SUCCESS:
    case LEARNINGUNITS_EDIT_SUCCESS:
    case LEARNINGUNITS_ADD_SUCCESS:
    case TEXTS_EDIT_SUCCESS:
    case TEXTS_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        id: {},
        items: [],
      });
    }

    case LEARNINGUNITS_TAXONOMIES_FETCH_SUCCESS: {
      return Object.assign({}, state, {
        taxonomies: {
          fetched: true,
          fetching: false,
          items: action.items,
        },
      });
    }

    case LEARNINGUNITS_ADD_FAILED: {
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

    case LEARNINGUNITS_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case LEARNINGUNITS_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      action.item.forEach((item) => {
        ids[item.LearningUnit.id] = {};
        ids[item.LearningUnit.id][item.Language.id] = {
          item,
          title: item.title,
          userId: item.User.id,
          username: item.User.username,
        };
      });

      return Object.assign({}, state, {
        fetching: false,
        id: ids,
      });
    }

    case LEARNINGUNITS_SUGGESTIONS_FETCH_SUCCESS: {
      const suggestions = action.items;

      return Object.assign({}, state, {
        suggestions,
      });
    }

    case LEARNINGUNITS_FETCH_SUCCESS: {
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

export default learningUnits;
