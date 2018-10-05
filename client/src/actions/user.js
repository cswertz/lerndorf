import * as types from './constants';

export const userRegisterFailed = (error, errors) => ({
  type: types.USER_REGISTER_FAILED,
  error,
  errors,
});

export const userLoginFailed = (error, errors) => ({
  type: types.USER_LOGIN_FAILED,
  error,
  errors,
});

export const userLoginSuccess = user => ({
  type: types.USER_LOGIN_SUCCESS,
  user,
});

export const userLogoutSUccess = () => ({
  type: types.USER_LOGOUT_SUCCESS,
});

export const userRegister = (data, history) => (
  dispatch => fetch('/api/users', {
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
          dispatch(userRegisterFailed(json.error, json.errors));
        } else {
          history.push('/login');
        }
      }
    })
    .catch((error) => {
      console.log('Error during registration:', error);
    })
);

export const userLogin = (data, history) => (
  dispatch => fetch('/api/users/login', {
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
          dispatch(userLoginFailed(json.error, json.errors));
        } else {
          dispatch(userLoginSuccess(json));
          history.push('/');
        }
      }
    })
    .catch((error) => {
      console.log('Error during login:', error);
    })
);

export const userLogout = history => (
  (dispatch) => {
    dispatch(userLogoutSUccess());
    history.push('/');
  }
);
