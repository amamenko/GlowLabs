const CREATE_ACCOUNT_PASSWORD_INVALID = "CREATE_ACCOUNT_PASSWORD_INVALID";
const CREATE_ACCOUNT_PASSWORD_NOT_INVALID =
  "CREATE_ACCOUNT_PASSWORD_NOT_INVALID";

const createAccountPasswordInvalidReducer = (
  state = { create_account_password_invalid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_PASSWORD_INVALID:
      return { ...state, create_account_password_invalid: true };
    case CREATE_ACCOUNT_PASSWORD_NOT_INVALID:
      return { ...state, create_account_password_invalid: false };
    default:
      return { ...state };
  }
};

export default createAccountPasswordInvalidReducer;
