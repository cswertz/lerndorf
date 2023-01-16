import * as types from './constants';

export const coursesFetchMyStatsSuccess = (items) => ({
  type: types.COURSES_STATS_FETCH_SUCCESS,
  items,
});

export const coursesFetchMyStatsFailed = (error, errors) => ({
  type: types.COURSES_STATS_FETCH_FAILED,
  error,
  errors,
});

export const coursesFetchSuccess = (items) => ({
  type: types.COURSES_ITEMS_FETCH_SUCCESS,
  items,
});

export const coursesFetchFailed = (error, errors) => ({
  type: types.COURSES_ITEMS_FETCH_FAILED,
  error,
  errors,
});

export const coursesFetchSingleSuccess = (item) => ({
  type: types.COURSES_ITEM_FETCH_SUCCESS,
  item,
});

export const coursesFetchSingleFailed = (error, errors) => ({
  type: types.COURSES_ITEM_FETCH_FAILED,
  error,
  errors,
});

export const coursesCreateSuccess = (items) => ({
  type: types.COURSES_CREATE_SUCCESS,
  items,
});

export const coursesCreateFailed = (error, errors) => ({
  type: types.COURSES_CREATE_FAILED,
  error,
  errors,
});

export const coursesDeleteSuccess = (items) => ({
  type: types.COURSES_DELETE_SUCCESS,
  items,
});

export const coursesDeleteFailed = (error, errors) => ({
  type: types.COURSES_DELETE_FAILED,
  error,
  errors,
});

export const coursesEnroleSuccess = (items) => ({
  type: types.COURSES_ENROLE_SUCCESS,
  items,
});

export const coursesEnroleFailed = (error, errors) => ({
  type: types.COURSES_ENROLE_FAILED,
  error,
  errors,
});

export const coursesFetchMy = () => async (dispatch) =>
  fetch('/api/courses/my', {
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
          dispatch(coursesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      dispatch(coursesFetchFailed(error));
    });

export const coursesFetchMyStats = () => async (dispatch) =>
  fetch('/api/courses/my/stats', {
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
          dispatch(coursesFetchMyStatsSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesFetchMyStatsFailed(error));
    });

export const coursesFetchMyPossible = () => async (dispatch) =>
  fetch('/api/courses/enroleable', {
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
          dispatch(coursesFetchSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesFetchFailed(error));
    });

export const courseEnroleTo = (id, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/enrole`, {
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
          dispatch(coursesEnroleSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesEnroleFailed(error));
    });

export const courseDelete = (id, history) => async (dispatch) =>
  fetch(`/api/courses/${id}`, {
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
          dispatch(coursesDeleteSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesDeleteFailed(error));
    });

export const courseCreate = (title, history) => async (dispatch) =>
  fetch(`/api/courses`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      title,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(coursesCreateSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesCreateFailed(error));
      return error;
    });

export const courseFetchSingle = (id, history) => async (dispatch) =>
  fetch(`/api/courses/${id}`, {
    method: 'Get',
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
          dispatch(coursesFetchSingleSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesFetchSingleFailed(error));
      return error;
    });
