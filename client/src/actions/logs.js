import * as types from './constants';

export const logsFetchSuccess = (items) => ({
  type: types.LOGS_FETCH_SUCCESS,
  items,
});

export const logsFetch = () => (
  async (dispatch) => {
    try {
      const response = await fetch('/api/logs', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const json = await response.json();
      if (json) {
        if (json.error) {
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(logsFetchSuccess(json));
        }
      }
    } catch (e) {
      console.log('Error while fetching logs:', e);
    }
  }
);
