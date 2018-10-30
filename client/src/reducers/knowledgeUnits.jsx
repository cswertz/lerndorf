import {
  KNOWLEDGEUNITS_ITEM_FETCH_SUCCESS,
  KNOWLEDGEUNITS_DELETE_SUCCESS,
  KNOWLEDGEUNITS_FETCH_SUCCESS,
  KNOWLEDGEUNITS_EDIT_SUCCESS,
  KNOWLEDGEUNITS_ADD_SUCCESS,
  KNOWLEDGEUNITS_ADD_FAILED,
  KNOWLEDGEUNITS_FETCH,
} from '../actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
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
  id: {},
};

const knowledgeUnits = (state = initialState, action) => {
  switch (action.type) {
    case KNOWLEDGEUNITS_DELETE_SUCCESS:
    case KNOWLEDGEUNITS_EDIT_SUCCESS:
    case KNOWLEDGEUNITS_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        id: {},
        items: [],
      });
    }

    case KNOWLEDGEUNITS_ADD_FAILED: {
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

    case KNOWLEDGEUNITS_FETCH: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: true,
      });
    }

    case KNOWLEDGEUNITS_ITEM_FETCH_SUCCESS: {
      const ids = state.id;
      action.item.forEach((item) => {
        ids[item.id] = {};
        ids[item.id][item.Language.id] = {
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

    case KNOWLEDGEUNITS_FETCH_SUCCESS: {
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

export default knowledgeUnits;
