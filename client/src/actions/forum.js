import * as types from './constants';

export const forumItemsFetchSuccess = (items) => ({
  type: types.FORUM_ITEMS_FETCH_SUCCESS,
  items,
});

export const forumItemsFetchFailed = (error, errors) => ({
  type: types.FORUM_ITEMS_FETCH_FAILED,
  error,
  errors,
});

export const forumThreadFetchSuccess = (item) => ({
  type: types.THREAD_ITEM_FETCH_SUCCESS,
  item,
});

export const forumThreadFetchFailed = (error, errors) => ({
  type: types.THREAD_ITEM_FETCH_FAILED,
  error,
  errors,
});

export const forumThreadFetchAddAnswerSuccess = (item) => ({
  type: types.THREAD_ITEM_FETCH_SUCCESS,
  item,
});

export const forumThreadFetchAddAnswerFailed = (error, errors) => ({
  type: types.THREAD_ITEM_FETCH_FAILED,
  error,
  errors,
});

export const forumThreadStatsSuccess = (item) => ({
  type: types.THREAD_ITEM_CREATE_SUCCESS,
  item,
});

export const forumThreadStatsFailed = (error, errors) => ({
  type: types.THREAD_ITEM_CREATE_FAILED,
  error,
  errors,
});

export const forumThreadCreateSuccess = (item) => ({
  type: types.THREAD_ITEM_CREATE_SUCCESS,
  item,
});

export const forumThreadCreateFailed = (error, errors) => ({
  type: types.THREAD_ITEM_CREATE_FAILED,
  error,
  errors,
});

export const forumThreadUpdateSuccess = (item) => ({
  type: types.THREAD_ITEM_UPDATE_SUCCESS,
  item,
});

export const forumThreadUpdateFailed = (error, errors) => ({
  type: types.THREAD_ITEM_UPDATE_FAILED,
  error,
  errors,
});

export const forumThreadDeleteSuccess = (item) => ({
  type: types.THREAD_ITEM_DELETE_SUCCESS,
  item,
});

export const forumThreadDeleteFailed = (error, errors) => ({
  type: types.THREAD_ITEM_DELETE_FAILED,
  error,
  errors,
});

export const forumPublicThreadsFetch = () => async (dispatch) =>
  fetch('/api/threads', {
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
          dispatch(forumItemsFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      dispatch(forumItemsFetchFailed(error));
    });

export const forumPublicThreadsStatsFetch = () => async (dispatch) =>
  fetch('/api/threads/stats', {
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
          dispatch(forumThreadStatsSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(forumThreadStatsFailed(error));
    });

export const forumThreadFetch = (id) => async (dispatch) =>
  fetch(`/api/threads/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 403 || response.status === 401) {
        throw new Error('Invalid response', { cause: response.status });
      }
      return response.json();
    })
    .then((json) => {
      if (json && !json.error) {
        dispatch(forumThreadFetchSuccess(json));
      }
    });

export const forumThreadCreate = (data, history) => async (dispatch) =>
  fetch(`/api/threads`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 403 || response.status === 401) {
        dispatch(forumThreadCreateFailed(response.json()));
        throw new Error('Invalid response', { cause: response.status });
      }
      return response.json();
    })
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(forumThreadFetch(json.id));
        }
      }
    });

export const forumThreadUpdate = (id, data, history) => async (dispatch) =>
  fetch(`/api/threads/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 403 || response.status === 401) {
        dispatch(forumThreadUpdateFailed(response.json()));
        throw new Error('Invalid response', { cause: response.status });
      }
      return response.json();
    })
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(forumThreadUpdateSuccess(json));
        }
      }
    });

export const forumThreadDelete = (id, history) => async (dispatch) =>
  fetch(`/api/threads/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 403 || response.status === 401) {
        dispatch(forumThreadDeleteFailed(response.json()));
        throw new Error('Invalid response', { cause: response.status });
      }
      return response.json();
    })
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(forumThreadDeleteSuccess(json));
        }
      }
    });

export const forumThreadFetchAddAnswer = (id, data, history) => (dispatch) =>
  fetch(`/api/threads/${id}/answers`, {
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
          dispatch(forumThreadFetchAddAnswerFailed(json.error, json.errors));
        } else {
          dispatch(forumThreadFetchAddAnswerSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error while answering to a forum thread:', error);
    });
