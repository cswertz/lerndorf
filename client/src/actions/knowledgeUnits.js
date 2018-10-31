import * as types from './constants';

export const knowledgeUnitsFetchSuccess = items => ({
  type: types.KNOWLEDGEUNITS_FETCH_SUCCESS,
  items,
});

export const knowledgeUnitsAddFailed = (error, errors) => ({
  type: types.KNOWLEDGEUNITS_ADD_FAILED,
  error,
  errors,
});

export const knowledgeUnitsAddSuccess = () => ({
  type: types.KNOWLEDGEUNITS_ADD_SUCCESS,
});

export const knowledgeUnitsEditSuccess = () => ({
  type: types.KNOWLEDGEUNITS_EDIT_SUCCESS,
});

export const knowledgeUnitsDeleteSuccess = () => ({
  type: types.KNOWLEDGEUNITS_DELETE_SUCCESS,
});

export const knowledgeUnitsItemFetchSuccess = item => ({
  type: types.KNOWLEDGEUNITS_ITEM_FETCH_SUCCESS,
  item,
});

export const knowledgeUnitsFetch = () => (
  dispatch => fetch('/api/knowledgeUnits', {
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
          console.log('fetched', json)
          dispatch(knowledgeUnitsFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    })
);

export const knowledgeUnitsItemFetch = id => (
  dispatch => fetch(`/api/knowledgeUnits/${id}`, {
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
          dispatch(knowledgeUnitsItemFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    })
);

export const knowledgeUnitsAdd = (data, history) => (
  dispatch => fetch('/api/knowledgeUnits', {
    method: 'post',
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
          dispatch(knowledgeUnitsAddFailed(json.error, json.errors));
        } else {
          dispatch(knowledgeUnitsAddSuccess());
          history.push(`/knowledge-units/show/${json.id}`);
        }
      }
    })
    .catch((error) => {
      console.log('Error while adding knowledge unit:', error);
    })
);

export const knowledgeUnitsDelete = id => (
  dispatch => fetch(`/api/knowledgeUnits/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(knowledgeUnitsDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error while deleting knowledge unit:', error);
    })
);

export const knowledgeUnitsEdit = (id, data, history) => (
  dispatch => fetch(`/api/knowledgeUnits/${id}`, {
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
          // dispatch(knowledgeUnitsEditFailed(json.error, json.errors));
        } else {
          dispatch(knowledgeUnitsEditSuccess());
          history.push('/knowledgeUnits');
        }
      }
    })
    .catch((error) => {
      console.log('Error while editing knowledge unit:', error);
    })
);
