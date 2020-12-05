const CREATE_ACCOUNT_PASSWORD_VALID = "CREATE_ACCOUNT_PASSWORD_VALID";
const CREATE_ACCOUNT_PASSWORD_NOT_VALID = "CREATE_ACCOUNT_PASSWORD_NOT_VALID";

const createAccountPasswordValidReducer = (
  state = { create_account_password_valid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_PASSWORD_VALID:
      return { ...state, create_account_password_valid: true };
    case CREATE_ACCOUNT_PASSWORD_NOT_VALID:
      return { ...state, create_account_password_valid: false };
    default:
      return { ...state };
  }
};

export default createAccountPasswordValidReducer;
