import * as types from './constants';

export const coursesFetchSuccess = (items) => ({
  type: types.COURSES_ITEMS_FETCH_SUCCESS,
  items,
});

export const coursesFetchFailed = (error, errors) => ({
  type: types.COURSES_ITEMS_FETCH_FAILED,
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
