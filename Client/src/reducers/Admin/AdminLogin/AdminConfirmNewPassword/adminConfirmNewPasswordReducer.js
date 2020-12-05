const ADMIN_CONFIRM_NEW_PASSWORD = "ADMIN_CONFIRM_NEW_PASSWORD";
const ADMIN_CONFIRM_NEW_PASSWORD_RESET = "ADMIN_CONFIRM_NEW_PASSWORD_RESET";

const adminConfirmNewPasswordReducer = (
  state = { admin_confirm_new_password: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_CONFIRM_NEW_PASSWORD:
      return {
        ...state,
        admin_confirm_new_password: action.admin_confirm_new_password,
      };
    case ADMIN_CONFIRM_NEW_PASSWORD_RESET:
      return { ...state, admin_confirm_new_password: "" };
    default:
      return { ...state };
  }
};

export default adminConfirmNewPasswordReducer;
