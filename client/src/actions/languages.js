import * as types from './constants';

export const languagesFetchSuccess = (languages) => ({
  type: types.LANGUAGES_FETCH_SUCCESS,
  languages,
});

export const languagesAddFailed = (error, errors) => ({
  type: types.LANGUAGES_ADD_FAILED,
  error,
  errors,
});

export const languagesAddSuccess = () => ({
  type: types.LANGUAGES_ADD_SUCCESS,
});

export const languagesEditSuccess = () => ({
  type: types.LANGUAGES_EDIT_SUCCESS,
});

export const languagesDeleteSuccess = () => ({
  type: types.LANGUAGES_DELETE_SUCCESS,
});

export const languagesFetch = () => (dispatch) =>
  fetch('/api/languages', {
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
          dispatch(languagesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching languages:', error);
    });

export const languagesAdd = (data, history) => (dispatch) =>
  fetch('/api/languages', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          dispatch(languagesAddFailed(json.error, json.errors));
        } else {
          dispatch(languagesAddSuccess());
          history.push('/languages');
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const languagesDelete = (id) => (dispatch) =>
  fetch(`/api/languages/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(languagesDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const languagesEdit = (id, data, history) => (dispatch) =>
  fetch(`/api/languages/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(languagesEditFailed(json.error, json.errors));
        } else {
          dispatch(languagesEditSuccess());
          history.push('/languages');
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });
