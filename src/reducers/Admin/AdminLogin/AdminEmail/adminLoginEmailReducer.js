const ADMIN_LOGIN_EMAIL = "ADMIN_LOGIN_EMAIL";
const ADMIN_LOGIN_EMAIL_RESET = "ADMIN_LOGIN_EMAIL_RESET";

const adminLoginEmailReducer = (state = { admin_login_email: "" }, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_EMAIL:
      return { ...state, admin_login_email: action.admin_login_email };
    case ADMIN_LOGIN_EMAIL_RESET:
      return { ...state, admin_login_email: "" };
    default:
      return { ...state };
  }
};

export default adminLoginEmailReducer;
