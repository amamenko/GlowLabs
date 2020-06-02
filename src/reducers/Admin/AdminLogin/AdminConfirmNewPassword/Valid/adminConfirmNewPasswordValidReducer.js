const ADMIN_CONFIRM_NEW_PASSWORD_VALID = "ADMIN_CONFIRM_NEW_PASSWORD_VALID";
const ADMIN_CONFIRM_NEW_PASSWORD_NOT_VALID =
  "ADMIN_CONFIRM_NEW_PASSWORD_NOT_VALID";

const adminConfirmNewPasswordValidReducer = (
  state = { admin_confirm_new_password_valid: false },
  action
) => {
  switch (action.type) {
    case ADMIN_CONFIRM_NEW_PASSWORD_VALID:
      return { ...state, admin_confirm_new_password_valid: true };
    case ADMIN_CONFIRM_NEW_PASSWORD_NOT_VALID:
      return { ...state, admin_confirm_new_password_valid: false };
    default:
      return { ...state };
  }
};

export default adminConfirmNewPasswordValidReducer;
