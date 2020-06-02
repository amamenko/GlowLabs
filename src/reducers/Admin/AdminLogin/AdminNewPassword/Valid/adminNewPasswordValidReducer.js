const ADMIN_NEW_PASSWORD_VALID = "ADMIN_NEW_PASSWORD_VALID";
const ADMIN_NEW_PASSWORD_NOT_VALID = "ADMIN_NEW_PASSWORD_NOT_VALID";

const adminNewPasswordValidReducer = (
  state = { admin_new_password_valid: false },
  action
) => {
  switch (action.type) {
    case ADMIN_NEW_PASSWORD_VALID:
      return { ...state, admin_new_password_valid: true };
    case ADMIN_NEW_PASSWORD_NOT_VALID:
      return { ...state, admin_new_password_valid: false };
    default:
      return { ...state };
  }
};

export default adminNewPasswordValidReducer;
