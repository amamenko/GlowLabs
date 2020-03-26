const CREATE_ACCOUNT_EMAIL_VALID = "CREATE_ACCOUNT_EMAIL_VALID";
const CREATE_ACCOUNT_EMAIL_NOT_VALID = "CREATE_ACCOUNT_EMAIL_NOT_VALID";

const createAccountEmailValidReducer = (
  state = { create_account_email_valid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_EMAIL_VALID:
      return { ...state, create_account_email_valid: true };
    case CREATE_ACCOUNT_EMAIL_NOT_VALID:
      return { ...state, create_account_email_valid: false };
    default:
      return { ...state };
  }
};

export default createAccountEmailValidReducer;
