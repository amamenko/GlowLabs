const LOGIN_PASSWORD_INVALID = "LOGIN_PASSWORD_INVALID";
const LOGIN_PASSWORD_NOT_INVALID = "LOGIN_PASSWORD_NOT_INVALID";

const loginPasswordInvalidReducer = (
  state = { login_password_invalid: false },
  action
) => {
  switch (action.type) {
    case LOGIN_PASSWORD_INVALID:
      return { ...state, login_password_invalid: true };
    case LOGIN_PASSWORD_NOT_INVALID:
      return { ...state, login_password_invalid: false };
    default:
      return { ...state };
  }
};

export default loginPasswordInvalidReducer;
