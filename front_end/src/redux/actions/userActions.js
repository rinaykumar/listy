const axios = require('axios');

// used for signing up
export const signupUser = (username, password, isAdmin) => {
  return (dispatch) => {
    dispatch(signupUserRequest(username, password, isAdmin));
    console.log(username);
    console.log(password);
    console.log(isAdmin);

    axios
      .get(
        `/auth/register?userName=${username}&password=${password}&isAdmin=${isAdmin}`
      )
      .then((response) => {
        const signupResponse = response.data;
        console.log(signupResponse);
        dispatch(SignupSuccess(signupResponse));
        if (signupResponse === 'User has been inserted') {
          dispatch(setIsLoggedIn(true));
        } else {
          alert('Username might be already taken. Please try again.');
        }
      })
      .catch((error) => {
        dispatch(SignupFailure(error.message));
      });
  };
};

// used for logging in
export const fetchUsers = (username, password) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest(username, password));
    console.log(username);
    console.log(password);

    axios
      .get(`/auth/logIn?userName=${username}&password=${password}`)
      .then((response) => {
        const loginResponse = response.data;
        console.log(loginResponse.success);
        dispatch(LoginSuccess(loginResponse));
        if (loginResponse.success) {
          dispatch(setIsLoggedIn(true));
        } else {
          alert('Invalid username or password. Please try again.');
        }
      })
      .catch((error) => {
        dispatch(LoginFailure(error.message));
      });
  };
};

export const fetchUsersRequest = () => {
  return {
    type: 'FETCH_USERS_REQUEST',
  };
};

export const signupUserRequest = () => {
  return {
    type: 'FETCH_USERS_REQUEST',
  };
};

export const SignupSuccess = (axiosResponse) => {
  return {
    type: 'SIGNUP_SUCCESS',
    payload: axiosResponse,
  };
};

export const SignupFailure = (axiosResponse) => {
  return {
    type: 'SIGNUP_FAILURE',
    payload: axiosResponse,
  };
};

export const LoginSuccess = (axiosResponse) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: axiosResponse,
  };
};

export const LoginFailure = (axiosResponse) => {
  return {
    type: 'LOGIN_FAILURE',
    payload: axiosResponse,
  };
};

export const setUsername = (username) => ({
  type: 'USERNAME_SET',
  username,
});

export const setPassword = (password) => ({
  type: 'PASSWORD_SET',
  password,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: 'USER_SET_LOGGED_IN',
  isLoggedIn,
});

export const setIsAdmin = (isAdmin) => ({
  type: 'USER_SET_ADMIN',
  isAdmin,
});
