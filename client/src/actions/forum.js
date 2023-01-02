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

export const forumThreadUpdateSuccess = (item) => ({
  type: types.THREAD_ITEM_UPDATE_SUCCESS,
  item,
});

export const forumThreadUpdateFailed = (error, errors) => ({
  type: types.THREAD_ITEM_UPDATE_FAILED,
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
      console.error(json);
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
