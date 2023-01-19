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

export const coursesFetchContentSuccess = (item) => ({
  type: types.COURSES_CONTENT_FETCH_SUCCESS,
  item,
});

export const coursesFetchContentFailed = (error, errors) => ({
  type: types.COURSES_CONTENT_FETCH_FAILED,
  error,
  errors,
});

export const coursesUpdateContentSuccess = (item) => ({
  type: types.COURSES_CONTENT_UPDATE_SUCCESS,
  item,
});

export const coursesUpdateContentFailed = (error, errors) => ({
  type: types.COURSES_CONTENT_UPDATE_FAILED,
  error,
  errors,
});

export const coursesAddContentSuccess = (item) => ({
  type: types.COURSES_CONTENT_ADD_SUCCESS,
  item,
});

export const coursesAddContentFailed = (error, errors) => ({
  type: types.COURSES_CONTENT_ADD_FAILED,
  error,
  errors,
});

export const coursesRemoveContentSuccess = (item) => ({
  type: types.COURSES_CONTENT_REMOVE_SUCCESS,
  item,
});

export const coursesRemoveContentFailed = (error, errors) => ({
  type: types.COURSES_CONTENT_REMOVE_FAILED,
  error,
  errors,
});

export const coursesAddSequenceSuccess = (item) => ({
  type: types.COURSES_SEQUENCE_ADD_SUCCESS,
  item,
});

export const coursesAddSequenceFailed = (error, errors) => ({
  type: types.COURSES_SEQUENCE_ADD_FAILED,
  error,
  errors,
});

export const coursesRemoveSequenceSuccess = (item) => ({
  type: types.COURSES_SEQUENCE_REMOVE_SUCCESS,
  item,
});

export const coursesRemoveSequenceFailed = (error, errors) => ({
  type: types.COURSES_SEQUENCE_REMOVE_FAILED,
  error,
  errors,
});

export const coursesCreateSuccess = (item) => ({
  type: types.COURSES_CREATE_SUCCESS,
  item,
});

export const coursesCreateFailed = (error, errors) => ({
  type: types.COURSES_CREATE_FAILED,
  error,
  errors,
});

export const coursesUpdateSuccess = (item) => ({
  type: types.COURSES_UPDATE_SUCCESS,
  item,
});

export const coursesUpdateFailed = (error, errors) => ({
  type: types.COURSES_UPDATE_FAILED,
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

export const coursesFetchUserUpdateConfirmationSuccess = (item) => ({
  type: types.COURSES_USER_CONFIRMATION_SUCCESS,
  item,
});

export const coursesFetchUserUpdateConfirmationFailed = (error, errors) => ({
  type: types.COURSES_USER_CONFIRMATION_FAILED,
  error,
  errors,
});

export const coursesUserRemoveSuccess = (item) => ({
  type: types.COURSES_USER_REMOVE_SUCCESS,
  item,
});

export const coursesUserRemoveFailed = (error, errors) => ({
  type: types.COURSES_USER_REMOVE_FAILED,
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

export const courseUpdate = (id, body, history) => async (dispatch) =>
  fetch(`/api/courses/${id}`, {
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
          dispatch(coursesUpdateSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesUpdateFailed(error));
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

export const courseFetchContent = (id, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/content`, {
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
          dispatch(coursesFetchContentSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesFetchContentFailed(error));
      return error;
    });

export const courseFetchContentUpdate = (id, contentId, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/content/${contentId}/update`, {
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
          dispatch(coursesUpdateContentSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesUpdateContentFailed(error));
      return error;
    });

export const courseContentAdd = (id, contentId, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/content`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ contentId }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(coursesAddContentSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesAddContentFailed(error));
      return error;
    });

export const courseContentRemove = (id, contentId, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/content/${contentId}`, {
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
          dispatch(coursesRemoveContentSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesRemoveContentFailed(error));
      return error;
    });

export const courseSequenceUpdate = (id, sequenceId, name, list, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/sequences/${sequenceId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, list }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(coursesAddSequenceSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesAddSequenceFailed(error));
      return error;
    });

export const courseSequenceAdd = (id, name, list, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/sequences`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ name, list }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(coursesAddSequenceSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesAddSequenceFailed(error));
      return error;
    });

export const courseSequenceRemove = (id, sequenceId, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/sequences/${sequenceId}`, {
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
          dispatch(coursesRemoveSequenceSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesRemoveSequenceFailed(error));
      return error;
    });

export const courseUpdateUserConfirmation = (id, userId, confirm, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ confirm: confirm === true }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(coursesFetchUserUpdateConfirmationSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesFetchUserUpdateConfirmationFailed(error));
      return error;
    });

export const courseUserAdd = (id, userId, roleId, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId, roleId }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        if (!json.error) {
          dispatch(coursesUserRemoveSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesUserRemoveFailed(error));
      return error;
    });

export const courseUserRemove = (id, userId, confirm, history) => async (dispatch) =>
  fetch(`/api/courses/${id}/users/${userId}`, {
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
          dispatch(coursesUserRemoveSuccess(json));
        }
      }
      return json;
    })
    .catch((error) => {
      dispatch(coursesUserRemoveFailed(error));
      return error;
    });
