import {
  KNOWLEDGEUNITS_TAXONOMIES_FETCH_SUCCESS,
  KNOWLEDGEUNITS_ITEM_FETCH_SUCCESS,
  KNOWLEDGEUNITS_DELETE_SUCCESS,
  KNOWLEDGEUNITS_FETCH_SUCCESS,
  KNOWLEDGEUNITS_EDIT_SUCCESS,
  KNOWLEDGEUNITS_ADD_SUCCESS,
  KNOWLEDGEUNITS_ADD_FAILED,
  KNOWLEDGEUNITS_ITEM_FETCH,
  KNOWLEDGEUNITS_FETCH,
  TEXTS_ADD_SUCCESS,
} from '@actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  fetchingId: null,
  items: [],
  taxonomies: {
    fetching: false,
    fetched: false,
    items: {
      minimumScreenResolution: [],
      knowledgeType: [],
      courseLevel: [],
      mediaType: [],
      licences: [],
      eqflevel: [],
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

const knowledgeUnits = (state = initialState, action) => {
  switch (action.type) {
    case KNOWLEDGEUNITS_DELETE_SUCCESS:
    case KNOWLEDGEUNITS_EDIT_SUCCESS:
    case KNOWLEDGEUNITS_ADD_SUCCESS:
    case TEXTS_ADD_SUCCESS: {
      return { ...state, fetched: false, fetching: false, fetchingId: null, id: {}, items: [] };
    }

    case KNOWLEDGEUNITS_TAXONOMIES_FETCH_SUCCESS: {
      return {
        ...state,
        taxonomies: {
          fetched: true,
          fetching: false,
          items: action.items,
        },
      };
    }

    case KNOWLEDGEUNITS_ADD_FAILED: {
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

    case KNOWLEDGEUNITS_FETCH: {
      return { ...state, fetched: false, fetching: true };
    }

    case KNOWLEDGEUNITS_ITEM_FETCH: {
      return { ...state, fetchingId: action.id };
    }

    case KNOWLEDGEUNITS_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      ids[action.item.id] = action.item;

      return { ...state, fetching: false, id: ids };
    }

    case KNOWLEDGEUNITS_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

export default knowledgeUnits;
