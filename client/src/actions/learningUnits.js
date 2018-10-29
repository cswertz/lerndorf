import * as types from './constants';

export const learningUnitsFetchSuccess = items => ({
  type: types.LEARNINGUNITS_FETCH_SUCCESS,
  items,
});

export const learningUnitsAddFailed = (error, errors) => ({
  type: types.LEARNINGUNITS_ADD_FAILED,
  error,
  errors,
});

export const learningUnitsAddSuccess = () => ({
  type: types.LEARNINGUNITS_ADD_SUCCESS,
});

export const learningUnitsEditSuccess = () => ({
  type: types.LEARNINGUNITS_EDIT_SUCCESS,
});

export const learningUnitsDeleteSuccess = () => ({
  type: types.LEARNINGUNITS_DELETE_SUCCESS,
});

export const learningUnitsFetch = () => (
  dispatch => fetch('/api/learningUnits', {
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
          dispatch(learningUnitsFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    })
);

export const learningUnitsAdd = (data, history) => (
  dispatch => fetch('/api/learningUnits', {
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
          dispatch(learningUnitsAddFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsAddSuccess());
          history.push('/learningUnits');
        }
      }
    })
    .catch((error) => {
      console.log('Error while adding knowledge unit:', error);
    })
);

export const learningUnitsDelete = id => (
  dispatch => fetch(`/api/learningUnits/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(learningUnitsDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error while deleting knowledge unit:', error);
    })
);

export const learningUnitsEdit = (id, data, history) => (
  dispatch => fetch(`/api/learningUnits/${id}`, {
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
          // dispatch(learningUnitsEditFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsEditSuccess());
          history.push('/learningUnits');
        }
      }
    })
    .catch((error) => {
      console.log('Error while editing knowledge unit:', error);
    })
);
