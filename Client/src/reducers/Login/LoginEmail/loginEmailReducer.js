const LOGIN_EMAIL = "LOGIN_EMAIL";
const LOGIN_EMAIL_RESET = "LOGIN_EMAIL_RESET";

const loginEmailReducer = (state = { login_email: "" }, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return { ...state, login_email: action.login_email };
    case LOGIN_EMAIL_RESET:
      return { ...state, login_email: "" };
    default:
      return { ...state };
  }
};

export default loginEmailReducer;
