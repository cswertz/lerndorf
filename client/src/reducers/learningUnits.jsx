import {
  LEARNINGUNITS_CAPABILITIES_UPDATE_SUCCESS,
  LEARNINGUNITS_ITEM_FETCH_SUCCESS,
  LEARNINGUNITS_DELETE_SUCCESS,
  LEARNINGUNITS_FETCH_SUCCESS,
  LEARNINGUNITS_EDIT_SUCCESS,
  LEARNINGUNITS_ADD_SUCCESS,
  LEARNINGUNITS_ADD_FAILED,
  LEARNINGUNITS_FETCH,
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

const learningUnits = (state = initialState, action) => {
  switch (action.type) {
    case LEARNINGUNITS_CAPABILITIES_UPDATE_SUCCESS:
    case LEARNINGUNITS_DELETE_SUCCESS:
    case LEARNINGUNITS_EDIT_SUCCESS:
    case LEARNINGUNITS_ADD_SUCCESS: {
      return Object.assign({}, state, {
        fetched: false,
        fetching: false,
        id: {},
        items: [],
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
      ids[action.item.id] = action.item;

      return Object.assign({}, state, {
        fetching: false,
        id: ids,
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
