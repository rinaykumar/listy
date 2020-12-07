// const initState = {
//   username: "",
//   password: "",
// };

const initState = () => ({
  username: "",
  password: "",
  isLoggedIn: false,
  isAdmin: false,
});

const userReducer = (state = initState(), action) => {
  switch (action.type) {
    case "USERNAME_SET":
      return {
        ...state,
        username: action.username,
      };
    case "USER_SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case "PASSWORD_SET":
      return {
        ...state,
        password: action.password,
      };
    default:
      return state;
  }
};

export default userReducer;
