export const setUsername = (username) => ({
  type: "USERNAME_SET",
  username,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: 'USER_SET_LOGGED_IN',
  isLoggedIn,
});

export const setPassword = (password) => ({
  type: "PASSWORD_SET",
  password,
});
