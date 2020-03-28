const LOGIN_PASSWORD = "LOGIN_PASSWORD";
const LOGIN_PASSWORD_RESET = "LOGIN_PASSWORD_RESET";

const loginPasswordReducer = (state = { login_password: "" }, action) => {
  switch (action.type) {
    case LOGIN_PASSWORD:
      return { ...state, login_password: action.login_password };
    case LOGIN_PASSWORD_RESET:
      return { ...state, login_password: "" };
    default:
      return { ...state };
  }
};

export default loginPasswordReducer;
