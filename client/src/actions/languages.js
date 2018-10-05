import * as types from './constants';

export const languagesFetchSuccess = languages => ({
  type: types.LANGUAGES_FETCH_SUCCESS,
  languages,
});

export const languagesFetch = () => (
  dispatch => fetch('/api/languages', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(response => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          //dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(languagesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching languages:', error);
    })
);
