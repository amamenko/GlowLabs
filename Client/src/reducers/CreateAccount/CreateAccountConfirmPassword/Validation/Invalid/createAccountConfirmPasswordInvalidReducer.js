const CREATE_ACCOUNT_CONFIRM_PASSWORD_INVALID =
  "CREATE_ACCOUNT_CONFIRM_PASSWORD_INVALID";
const CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID =
  "CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID";

const createAccountConfirmPasswordInvalidReducer = (
  state = { create_account_confirm_password_invalid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_CONFIRM_PASSWORD_INVALID:
      return { ...state, create_account_confirm_password_invalid: true };
    case CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID:
      return { ...state, create_account_confirm_password_invalid: false };
    default:
      return { ...state };
  }
};

export default createAccountConfirmPasswordInvalidReducer;
