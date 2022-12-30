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
      console.log('Error while fetching knowledge units:', error);
    });
