const ADMIN_LOGIN_EMAIL_INVALID = "ADMIN_LOGIN_EMAIL_INVALID";
const ADMIN_LOGIN_EMAIL_NOT_INVALID = "ADMIN_LOGIN_EMAIL_NOT_INVALID";

const adminLoginEmailInvalidReducer = (
  state = { admin_login_email_invalid: false },
  action
) => {
  switch (action.type) {
    case ADMIN_LOGIN_EMAIL_INVALID:
      return { ...state, admin_login_email_invalid: true };
    case ADMIN_LOGIN_EMAIL_NOT_INVALID:
      return { ...state, admin_login_email_invalid: false };
    default:
      return { ...state };
  }
};

export default adminLoginEmailInvalidReducer;
