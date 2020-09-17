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

export const learningUnitsItemFetchSuccess = item => ({
  type: types.LEARNINGUNITS_ITEM_FETCH_SUCCESS,
  item,
});

export const learningUnitsSuggestionsFetchSuccess = items => ({
  type: types.LEARNINGUNITS_SUGGESTIONS_FETCH_SUCCESS,
  items,
});

export const learningUnitsTaxonomiesFetchSuccess = items => ({
  type: types.LEARNINGUNITS_TAXONOMIES_FETCH_SUCCESS,
  items,
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

export const learningUnitsItemFetch = (id) => (
  async (dispatch) => {
    await dispatch({
      type: types.LEARNINGUNITS_ITEM_FETCH,
      id,
    });

    try {
      const response = await fetch(`/api/learningUnits/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const json = await response.json();
      if (json) {
        if (json.error) {
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsItemFetchSuccess(json));
        }
      }
    } catch (e) {
        console.log('Error while fetching knowledge units:', e);
    }
  }
);

export const learningUnitsSuggestionsFetch = (term) => (
  (dispatch) => fetch(`/api/learningUnits/suggestion/${term}`, {
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
          dispatch(learningUnitsSuggestionsFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching learning unit suggestions:', error);
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
          history.push('/learning-units');
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

export const learningUnitsEdit = (id, languageId, data, history) => (
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
          history.push(`/learning-units/edit/${languageId}/${id}`);
        }
      }
    })
    .catch((error) => {
      console.log('Error while editing knowledge unit:', error);
    })
);

export const learningUnitsAddTag = (learningUnitLanguageId, tag, languageId,
  learningUnitId, history) => (
  async (dispatch) => {
    try {
      const response = await fetch(`/api/learningUnits/addTag/${learningUnitLanguageId}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          tag,
        }),
      });

      const json = await response.json();
      if (json) {
        if (json.error) {
          // dispatch(learningUnitsAddFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsEditSuccess());
          history.push(`/learning-units/edit/${languageId}/${learningUnitId}`);
        }
      }
    } catch (e) {
      console.log('Error while adding knowledge unit:', e);
    }
  }
);

export const learningUnitsDeleteTag = (tagId, languageId, learningUnitId, history) => (
  async (dispatch) => {
    try {
      const response = await fetch(`/api/learningUnits/deleteTag/${tagId}`, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const json = await response.json();
      if (json) {
        if (json.error) {
          // dispatch(learningUnitsAddFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsEditSuccess());
          history.push(`/learning-units/edit/${languageId}/${learningUnitId}`);
        }
      }
    } catch (e) {
      console.log('Error while adding knowledge unit:', e);
    }
  }
);

export const learningUnitsAddRelation = (learningUnitId, targetId, type, languageId, history) => (
  dispatch => fetch(`/api/learningUnits/addRelation/${learningUnitId}`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      type,
      targetId,
    }),
  })
    .then(response => response.json())
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(learningUnitsAddFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsEditSuccess());
          history.push(`/learning-units/show/${languageId}/${learningUnitId}`);
        }
      }
    })
    .catch((error) => {
      console.log('Error while adding knowledge unit:', error);
    })
);

export const learningUnitsTaxonomiesFetch = () => (
  async (dispatch) => {
    await dispatch({
      type: types.LEARNINGUNITS_TAXONOMIES_FETCH,
    });

    try {
      const response = await fetch('/api/learningUnits/taxonomies', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const json = await response.json();
      if (json) {
        if (json.error) {
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(learningUnitsTaxonomiesFetchSuccess(json));
        }
      }
    } catch (e) {
      console.log('Error while fetching knowledge units:', e);
    }
  }
);
