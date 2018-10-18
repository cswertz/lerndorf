import * as types from './constants';

export const usersFetchSuccess = items => ({
  type: types.USERS_FETCH_SUCCESS,
  items,
});

export const usersItemFetchSuccess = item => ({
  type: types.USERS_ITEM_FETCH_SUCCESS,
  item,
});

export const usersEditSuccess = id => ({
  type: types.USERS_EDIT_SUCCESS,
  id,
});

export const usersDeleteSuccess = () => ({
  type: types.USERS_DELETE_SUCCESS,
});

export const usersFetch = () => (
  dispatch => fetch('/api/users', {
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
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(usersFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching users:', error);
    })
);

export const usersDelete = id => (
  dispatch => fetch(`/api/users/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(usersDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    })
);

export const usersEdit = (id, data, history) => (
  dispatch => fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(usersEditFailed(json.error, json.errors));
        } else {
          dispatch(usersEditSuccess(id));
          history.push(`/users/edit/${id}`);
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    })
);

export const usersItemFetch = id => (
  dispatch => fetch(`/api/users/${id}`, {
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
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(usersItemFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching users:', error);
    })
);
