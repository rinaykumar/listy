const initState = {
  username: "",
  password: "",
};


const listingReducer = (state = initState, action) => {
  switch (action.type) {
    case "USERNAME_SET":
      return {
        ...state,
        username: action.username,
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

export default listingReducer;
