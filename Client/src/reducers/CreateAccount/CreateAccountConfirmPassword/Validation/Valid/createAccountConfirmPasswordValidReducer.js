const CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID =
  "CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID";
const CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_VALID =
  "CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_VALID";

const createAccountConfirmPasswordValidReducer = (
  state = { create_account_confirm_password_valid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID:
      return { ...state, create_account_confirm_password_valid: true };
    case CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_VALID:
      return {
        ...state,
        create_account_confirm_password_valid: false
      };
    default:
      return { ...state };
  }
};

export default createAccountConfirmPasswordValidReducer;
