const ADMIN_NEW_PASSWORD_INVALID = "ADMIN_NEW_PASSWORD_INVALID";
const ADMIN_NEW_PASSWORD_NOT_INVALID = "ADMIN_NEW_PASSWORD_NOT_INVALID";

const adminNewPasswordInvalidReducer = (
  state = { admin_new_password_invalid: false },
  action
) => {
  switch (action.type) {
    case ADMIN_NEW_PASSWORD_INVALID:
      return { ...state, admin_new_password_invalid: true };
    case ADMIN_NEW_PASSWORD_NOT_INVALID:
      return { ...state, admin_new_password_invalid: false };
    default:
      return { ...state };
  }
};

export default adminNewPasswordInvalidReducer;
