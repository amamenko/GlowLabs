const CREATE_ACCOUNT_EMAIL_INVALID = "CREATE_ACCOUNT_EMAIL_INVALID";
const CREATE_ACCOUNT_EMAIL_NOT_INVALID = "CREATE_ACCOUNT_EMAIL_NOT_INVALID";

const createAccountEmailInvalidReducer = (
  state = { create_account_email_invalid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_EMAIL_INVALID:
      return { ...state, create_account_email_invalid: true };
    case CREATE_ACCOUNT_EMAIL_NOT_INVALID:
      return { ...state, create_account_email_invalid: false };
    default:
      return { ...state };
  }
};

export default createAccountEmailInvalidReducer;
