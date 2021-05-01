import * as types from './constants';

export const taxonomiesFetchSuccess = (items) => ({
  type: types.TAXONOMIES_FETCH_SUCCESS,
  items,
});

export const taxonomiesItemFetchSuccess = (item, children) => ({
  type: types.TAXONOMIES_ITEM_FETCH_SUCCESS,
  item,
  children,
});

export const taxonomiesAddFailed = (error, errors) => ({
  type: types.TAXONOMIES_ADD_FAILED,
  error,
  errors,
});

export const taxonomiesAddSuccess = () => ({
  type: types.TAXONOMIES_ADD_SUCCESS,
});

export const taxonomiesEditSuccess = () => ({
  type: types.TAXONOMIES_EDIT_SUCCESS,
});

export const taxonomiesDeleteSuccess = () => ({
  type: types.TAXONOMIES_DELETE_SUCCESS,
});

export const taxonomiesFetch = () => (dispatch) =>
  fetch('/api/taxonomies', {
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
          dispatch(taxonomiesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching taxonomies:', error);
    });

export const taxonomiesAdd = (data, history) => (dispatch) =>
  fetch('/api/taxonomies', {
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
          dispatch(taxonomiesAddFailed(json.error, json.errors));
        } else {
          dispatch(taxonomiesAddSuccess());
          if (!data.parent || data.parent === 1) {
            history.push('/taxonomies');
          } else {
            history.push(`/taxonomies/show/${data.parent}`);
          }
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const taxonomiesDelete = (id) => (dispatch) =>
  fetch(`/api/taxonomies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(taxonomiesDeleteSuccess());
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const taxonomiesDisable = (id) => async (dispatch) => {
  const data = { active: false };
  try {
    const response = await fetch(`/api/taxonomies/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json) {
      dispatch(taxonomiesEditSuccess());
    }
  } catch (e) {
    console.log('Error while disabling taxonomy term:', e);
  }
};

export const taxonomiesEnable = (id) => async (dispatch) => {
  const data = { active: true };
  try {
    const response = await fetch(`/api/taxonomies/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json) {
      dispatch(taxonomiesEditSuccess());
    }
  } catch (e) {
    console.log('Error while disabling taxonomy term:', e);
  }
};

export const taxonomiesEdit = (id, data, history) => (dispatch) =>
  fetch(`/api/taxonomies/${id}`, {
    method: 'PATCH',
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
          // dispatch(taxonomiesEditFailed(json.error, json.errors));
        } else {
          dispatch(taxonomiesEditSuccess());
          history.push('/taxonomies');
        }
      }
    })
    .catch((error) => {
      console.log('Error during adding language:', error);
    });

export const taxonomiesItemFetch = (id) => (dispatch) =>
  fetch(`/api/taxonomies/${id}`, {
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
          dispatch(taxonomiesItemFetchSuccess(json.item, json.children));
        }
      }
    })
    .catch((error) => {
      console.log('Error while fetching taxonomies:', error);
    });
