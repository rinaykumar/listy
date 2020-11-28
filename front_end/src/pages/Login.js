import React from "react";
import { connect, useDispatch } from "react-redux";
import { setUsername, setPassword } from "../redux/actions/userActions";

const Login = ({ userData }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Login</h3>
      <form>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={(e) => dispatch(setUsername(e.target.value))}
        />
        <br />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <input type="submit" value="Log In" name="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: () => dispatch(setUsername()),
    setPassword: () => dispatch(setPassword()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
