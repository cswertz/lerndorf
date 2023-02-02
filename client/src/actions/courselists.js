import * as types from './constants';

export const courseListsFetchSuccess = (items) => ({
  type: types.COURSE_LISTS_FETCH_SUCCESS,
  items,
});

export const courseListsFetchFailed = (error, errors) => ({
  type: types.COURSE_LISTS_FETCH_FAILED,
  error,
  errors,
});

export const courseListFetchSuccess = (item) => ({
  type: types.COURSE_LIST_FETCH_SUCCESS,
  item,
});

export const courseListFetchFailed = (error, errors) => ({
  type: types.COURSE_LIST_FETCH_FAILED,
  error,
  errors,
});

export const courseListRemoveSuccess = (item) => ({
  type: types.COURSE_LIST_REMOVE_SUCCESS,
  item,
});

export const courseListRemoveFailed = (error, errors) => ({
  type: types.COURSE_LIST_REMOVE_FAILED,
  error,
  errors,
});

export const courseListAddSuccess = (items) => ({
  type: types.COURSE_LIST_ADD_SUCCESS,
  items,
});

export const courseListAddFailed = (error, errors) => ({
  type: types.COURSE_LIST_ADD_SUCCESS,
  error,
  errors,
});

export const courseListsFetch = (history) => async (dispatch) =>
  fetch(`/api/courselists`, {
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
        if (!json.error) {
          dispatch(courseListsFetchSuccess(json));
        }
      }
      console.error('RESULT', json);
      return json;
    })
    .catch((error) => {
      dispatch(courseListsFetchFailed(error));
      return error;
    });

export const courseListFetch = (id, history) => async (dispatch) =>
  fetch(`/api/courselists/${id}`, {
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
        if (!json.error) {
          dispatch(courseListFetchSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(courseListFetchFailed(error));
      return error;
    });

export const courseListRemove = (id, history) => async (dispatch) =>
  fetch(`/api/courselists/${id}`, {
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
        if (!json.error) {
          dispatch(courseListRemoveSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(courseListRemoveFailed(error));
      return error;
    });

export const courseListUpdate = (id, body, history) => async (dispatch) =>
  fetch(`/api/courselists/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(courseListAddSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(courseListAddFailed(error));
      return error;
    });

export const courseListAdd = (body, history) => async (dispatch) =>
  fetch(`/api/courselists`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(courseListAddSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(courseListAddFailed(error));
      return error;
    });
