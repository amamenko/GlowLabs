const ADMIN_CONFIRM_NEW_PASSWORD_INVALID = "ADMIN_CONFIRM_NEW_PASSWORD_INVALID";
const ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID =
  "ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID";

const adminConfirmNewPasswordInvalidReducer = (
  state = { admin_confirm_new_password_invalid: false },
  action
) => {
  switch (action.type) {
    case ADMIN_CONFIRM_NEW_PASSWORD_INVALID:
      return { ...state, admin_confirm_new_password_invalid: true };
    case ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID:
      return { ...state, admin_confirm_new_password_invalid: false };
    default:
      return { ...state };
  }
};

export default adminConfirmNewPasswordInvalidReducer;
