const ADMIN_NEW_PASSWORD = "ADMIN_NEW_PASSWORD";
const ADMIN_NEW_PASSWORD_RESET = "ADMIN_NEW_PASSWORD_RESET";

const adminNewPasswordReducer = (
  state = { admin_new_password: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_NEW_PASSWORD:
      return { ...state, admin_new_password: action.admin_new_password };
    case ADMIN_NEW_PASSWORD_RESET:
      return { ...state, admin_new_password: "" };
    default:
      return { ...state };
  }
};

export default adminNewPasswordReducer;
