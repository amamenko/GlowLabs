const LOGIN_EMAIL_INVALID = "LOGIN_EMAIL_INVALID";
const LOGIN_EMAIL_NOT_INVALID = "LOGIN_EMAIL_NOT_INVALID";

const loginEmailInvalidReducer = (
  state = { login_email_invalid: false },
  action
) => {
  switch (action.type) {
    case LOGIN_EMAIL_INVALID:
      return { ...state, login_email_invalid: true };
    case LOGIN_EMAIL_NOT_INVALID:
      return { ...state, login_email_invalid: false };
    default:
      return { ...state };
  }
};

export default loginEmailInvalidReducer;
