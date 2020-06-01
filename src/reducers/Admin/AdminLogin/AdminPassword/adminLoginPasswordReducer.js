const ADMIN_LOGIN_PASSWORD = "ADMIN_LOGIN_PASSWORD";
const ADMIN_LOGIN_PASSWORD_RESET = "ADMIN_LOGIN_PASSWORD_RESET";

const adminLoginPasswordReducer = (
  state = { admin_login_password: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_LOGIN_PASSWORD:
      return { ...state, admin_login_password: action.admin_login_password };
    case ADMIN_LOGIN_PASSWORD_RESET:
      return { ...state, admin_login_password: "" };
    default:
      return { ...state };
  }
};

export default adminLoginPasswordReducer;
