import * as types from './constants';

export const usersFetchSuccess = items => ({
  type: types.USERS_FETCH_SUCCESS,
  items,
});

export const userActivationSuccess = () => ({
  type: types.USER_ACTIVATION_SUCCESS,
});

export const userActivationFailed = () => ({
  type: types.USER_ACTIVATION_FAILED,
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

export const usersRolesUpdateSuccess = () => ({
  type: types.USERS_ROLES_UPDATE_SUCCESS,
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

export const userActivate = hash => (
  dispatch => fetch(`/api/users/activate/${hash}`, {
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
          dispatch(userActivationFailed());
        } else {
          dispatch(userActivationSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error while activating user:', error);
    })
);

export const addRole = (id, role) => (
  dispatch => fetch(`/api/users/${id}/role`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      id: role,
    }),
  })
    .then(response => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(rolesEditFailed(json.error, json.errors));
        } else {
          dispatch(usersRolesUpdateSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding role:', error);
    })
);

export const removeRole = (id, role) => (
  dispatch => fetch(`/api/users/${id}/role/${role}`, {
    method: 'DELETE',
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
          // dispatch(rolesEditFailed(json.error, json.errors));
        } else {
          dispatch(usersRolesUpdateSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    })
);
