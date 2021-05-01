import { CAPABILITIES_FETCH_SUCCESS, CAPABILITIES_FETCH } from '../actions/constants';

const initialState = {
  fetching: false,
  fetched: false,
  items: [],
};

const capabilities = (state = initialState, action) => {
  switch (action.type) {
    case CAPABILITIES_FETCH: {
      return { ...state, fetched: false, fetching: true };
    }

    case CAPABILITIES_FETCH_SUCCESS: {
      return { ...state, fetched: true, fetching: false, items: action.items };
    }

    default:
      return state;
  }
};

export default capabilities;
