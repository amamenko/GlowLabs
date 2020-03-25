const CREATE_ACCOUNT_EMAIL = "CREATE_ACCOUNT_EMAIL";
const CREATE_ACCOUNT_EMAIL_RESET = "CREATE_ACCOUNT_EMAIL_RESET";

const createAccountEmailReducer = (
  state = { create_account_email: "" },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_EMAIL:
      return { ...state, create_account_email: action.create_account_email };
    case CREATE_ACCOUNT_EMAIL_RESET:
      return { ...state, create_account_email: "" };
    default:
      return { ...state };
  }
};

export default createAccountEmailReducer;
