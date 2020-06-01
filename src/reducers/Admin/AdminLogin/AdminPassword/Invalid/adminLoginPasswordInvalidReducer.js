const ADMIN_LOGIN_PASSWORD_INVALID = "ADMIN_LOGIN_PASSWORD_INVALID";
const ADMIN_LOGIN_PASSWORD_NOT_INVALID = "ADMIN_LOGIN_PASSWORD_NOT_INVALID";

const adminLoginPasswordInvalidReducer = (
  state = { admin_login_password_invalid: false },
  action
) => {
  switch (action.type) {
    case ADMIN_LOGIN_PASSWORD_INVALID:
      return { ...state, admin_login_password_invalid: true };
    case ADMIN_LOGIN_PASSWORD_NOT_INVALID:
      return { ...state, admin_login_password_invalid: false };
    default:
      return { ...state };
  }
};

export default adminLoginPasswordInvalidReducer;
