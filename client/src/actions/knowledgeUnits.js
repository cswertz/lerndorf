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

export const knowledgeUnitsTaxonomiesFetchSuccess = items => ({
  type: types.KNOWLEDGEUNITS_TAXONOMIES_FETCH_SUCCESS,
  items,
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
          dispatch(knowledgeUnitsFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    })
);

export const knowledgeUnitsItemFetch = (id) => (
  async (dispatch) => {
    await dispatch({
      type: types.KNOWLEDGEUNITS_ITEM_FETCH,
      id,
    });

    try {
      const response = await fetch(`/api/knowledgeUnits/${id}`, {
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
          dispatch(knowledgeUnitsItemFetchSuccess(json));
        }
      }
    } catch (e) {
      console.log('Error while fetching knowledge units:', e);
    }
  }
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

export const knowledgeUnitsDelete = (id, history = null) => (
  async (dispatch) => {
    try {
      const response = await fetch(`/api/knowledgeUnits/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const json = await response.json();
      if (json) {
        dispatch(knowledgeUnitsDeleteSuccess());
        if (history) {
          history.push('/learning-units/');
        }
      }
    } catch (e) {
      console.log('Error while deleting knowledge unit:', e);
    }
  }
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

export const knowledgeUnitsTaxonomiesFetch = () => (
  dispatch => fetch('/api/knowledgeUnits/taxonomies', {
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
          dispatch(knowledgeUnitsTaxonomiesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching knowledge units:', error);
    })
);


export const knowledgeUnitsMarkReviewed = id => (
  dispatch => fetch(`/api/knowledgeUnits/markReviewed/${id}`, {
    method: 'PATCH',
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
          // dispatch(knowledgeUnitsEditFailed(json.error, json.errors));
        } else {
          dispatch(knowledgeUnitsEditSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error while editing knowledge unit:', error);
    })
);

export const knowledgeUnitsMarkLectored = id => (
  dispatch => fetch(`/api/knowledgeUnits/markLectored/${id}`, {
    method: 'PATCH',
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
          // dispatch(knowledgeUnitsEditFailed(json.error, json.errors));
        } else {
          dispatch(knowledgeUnitsEditSuccess());
        }
      }
    })
    .catch((error) => {
      console.log('Error while editing knowledge unit:', error);
    })
);
