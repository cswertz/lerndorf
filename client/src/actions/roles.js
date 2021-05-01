import * as types from './constants';

export const rolesFetchSuccess = (items) => ({
  type: types.ROLES_FETCH_SUCCESS,
  items,
});

export const rolesItemFetchSuccess = (item) => ({
  type: types.ROLES_ITEM_FETCH_SUCCESS,
  item,
});

export const rolesAddFailed = (error, errors) => ({
  type: types.ROLES_ADD_FAILED,
  error,
  errors,
});

export const rolesAddSuccess = () => ({
  type: types.ROLES_ADD_SUCCESS,
});

export const rolesEditSuccess = () => ({
  type: types.ROLES_EDIT_SUCCESS,
});

export const rolesDeleteSuccess = () => ({
  type: types.ROLES_DELETE_SUCCESS,
});

export const rolesCapabilitiesUpdateSuccess = () => ({
  type: types.ROLES_CAPABILITIES_UPDATE_SUCCESS,
});

export const rolesFetch = () => (dispatch) =>
  fetch('/api/roles', {
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
          dispatch(rolesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching roles:', error);
    });

export const rolesAdd = (data, history) => (dispatch) =>
  fetch('/api/roles', {
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
          dispatch(rolesAddFailed(json.error, json.errors));
        } else {
          dispatch(rolesAddSuccess());
          history.push('/users/roles');
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const rolesDelete = (id) => (dispatch) =>
  fetch(`/api/roles/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(rolesDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const rolesEdit = (id, data, history) => (dispatch) =>
  fetch(`/api/roles/${id}`, {
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
          // dispatch(rolesEditFailed(json.error, json.errors));
        } else {
          dispatch(rolesEditSuccess());
          history.push('/users/roles');
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const addCapability = (id, capability) => (dispatch) =>
  fetch(`/api/roles/${id}/capability`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      id: capability,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(rolesEditFailed(json.error, json.errors));
        } else {
          dispatch(rolesCapabilitiesUpdateSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const removeCapability = (id, capability) => (dispatch) =>
  fetch(`/api/roles/${id}/capability/${capability}`, {
    method: 'DELETE',
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
          // dispatch(rolesEditFailed(json.error, json.errors));
        } else {
          dispatch(rolesCapabilitiesUpdateSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const rolesItemFetch = (id) => (dispatch) =>
  fetch(`/api/roles/${id}`, {
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
          dispatch(rolesItemFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching roles:', error);
    });
