import * as types from './constants';

export const capabilitiesFetchSuccess = (items) => ({
  type: types.CAPABILITIES_FETCH_SUCCESS,
  items,
});

export const capabilitiesFetch = () => (dispatch) =>
  fetch('/api/capabilities', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(capabilitiesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching capabilities:', error);
    });
