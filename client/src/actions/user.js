import * as types from './constants';

export const userRegisterFailed = (error, errors) => ({
  type: types.USER_REGISTER_FAILED,
  error,
  errors,
});

export const userRegisterSuccess = () => ({
  type: types.USER_REGISTER_SUCCESS,
});

export const userEditFailed = (error, errors) => ({
  type: types.USER_EDIT_FAILED,
  error,
  errors,
});

export const userEditSuccess = (user) => ({
  type: types.USER_EDIT_SUCCESS,
  user,
});

export const userLoginFailed = (error, errors) => ({
  type: types.USER_LOGIN_FAILED,
  error,
  errors,
});

export const userLoginSuccess = (user) => ({
  type: types.USER_LOGIN_SUCCESS,
  user,
});

export const userLogoutSUccess = () => ({
  type: types.USER_LOGOUT_SUCCESS,
});

export const userRolesFetchSuccess = (roles) => ({
  type: types.USER_ROLES_FETCH_SUCCESS,
  roles,
});

export const userRegister = (data, history) => {
  const formData = new FormData();
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    formData.append(key, data[key]);
  }

  return (dispatch) =>
    fetch('/api/users', {
      method: 'post',
      credentials: 'include',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          if (json.error) {
            dispatch(userRegisterFailed(json.error, json.errors));
          } else {
            dispatch(userRegisterSuccess());
            history.push('/users/login');
          }
        }
      })
      .catch((error) => {
        console.log('Error during registration:', error);
      });
};

export const userLogin = (data, history) => (dispatch) =>
  fetch('/api/users/login', {
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
          dispatch(userLoginFailed(json.error, json.errors));
        } else {
          dispatch(userLoginSuccess(json));
          history.push('/');
        }
      }
    })
    .catch((error) => {
      console.log('Error during login:', error);
    });

export const userLogout = (history) => (dispatch) =>
  fetch('/api/users/logout', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(() => {
      dispatch(userLogoutSUccess());
      history.push('/');
    })
    .catch((error) => {
      console.log('Error during logout:', error);
    });

export const userEdit = (id, data, history) => {
  const formData = new FormData();
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    formData.append(key, data[key]);
  }

  return (dispatch) =>
    fetch(`/api/users/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          if (json.error) {
            dispatch(userEditFailed(json.error, json.errors));
          } else {
            dispatch(userEditSuccess(json));
            history.push('/users/user/edit');
          }
        }
      })
      .catch((error) => {
        console.log('Error during editing:', error);
      });
};

export const userFetchRoles = (id) => (dispatch) =>
  fetch(`/api/users/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 401) {
        dispatch(userLogoutSUccess());
      }
      return response.json();
    })
    .then((json) => {
      if (json) {
        if (json.error) {
          // dispatch(userEditFailed(json.error, json.errors));
        } else {
          dispatch(userRolesFetchSuccess(json));
        }
      }
    })
    .catch((error) => {
      console.log('Error during editing:', error);
    });

export const userDelete = (id, data, history) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
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
        dispatch(userLogoutSUccess());
        history.push('/');
      }
    }
  } catch (e) {
    console.log('Error while deleting user:', e);
  }
};

export const userLanguageAdd = (id, data, history) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/language`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json) {
      if (json.error) {
        // dispatch(userEditFailed(json.error, json.errors));
      } else {
        dispatch(userEditSuccess(json));
        history.push('/users/user/languages');
      }
    }
  } catch (e) {
    console.log('Error while fetching knowledge units:', e);
  }
};

export const userLanguageDelete = (id, languageId, history) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/language/${languageId}`, {
      method: 'DELETE',
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
        dispatch(userEditSuccess(json));
        history.push('/users/user/languages');
      }
    }
  } catch (e) {
    console.log('Error while fetching knowledge units:', e);
  }
};

export const userLanguagePreferred = (id, data, history) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${id}/language/preferred`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json) {
      if (json.error) {
        // dispatch(userEditFailed(json.error, json.errors));
      } else {
        dispatch(userEditSuccess(json));
        history.push('/users/user/languages');
      }
    }
  } catch (e) {
    console.log('Error setting preferred language:', e);
  }
};
