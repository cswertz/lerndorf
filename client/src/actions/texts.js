import * as types from './constants';

export const textsFetchSuccess = (items) => ({
  type: types.TEXTS_FETCH_SUCCESS,
  items,
});

export const textsAddFailed = (error, errors) => ({
  type: types.TEXTS_ADD_FAILED,
  error,
  errors,
});

export const textsAddSuccess = () => ({
  type: types.TEXTS_ADD_SUCCESS,
});

export const textsEditSuccess = () => ({
  type: types.TEXTS_EDIT_SUCCESS,
});

export const textsDeleteSuccess = () => ({
  type: types.TEXTS_DELETE_SUCCESS,
});

export const textsItemFetchSuccess = (item) => ({
  type: types.TEXTS_ITEM_FETCH_SUCCESS,
  item,
});

export const textsFetch = () => (dispatch) =>
  fetch('/api/texts', {
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
          dispatch(textsFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    });

export const textsItemFetch = (id) => (dispatch) =>
  fetch(`/api/texts/${id}`, {
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
          dispatch(textsItemFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    });

export const textsAdd = (data, history) => (dispatch) =>
  fetch('/api/texts', {
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
          dispatch(textsAddFailed(json.error, json.errors));
        } else {
          dispatch(textsAddSuccess());
          history.push(`/texts/show/${json.id}`);
        }
      }
    })
    .catch((error) => {
      console.log('Error while adding knowledge unit:', error);
    });

export const textsDelete = (id) => (dispatch) =>
  fetch(`/api/texts/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(textsDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error while deleting knowledge unit:', error);
    });

export const textsEdit = (id, data, history) => (dispatch) =>
  fetch(`/api/texts/${id}`, {
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
          // dispatch(textsEditFailed(json.error, json.errors));
        } else {
          dispatch(textsEditSuccess());
          history.push(`/texts/show/${json.id}`);
        }
      }
    })
    .catch((error) => {
      console.log('Error while editing knowledge unit:', error);
    });
