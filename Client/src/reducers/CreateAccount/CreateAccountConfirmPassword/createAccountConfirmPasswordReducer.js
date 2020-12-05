const CREATE_ACCOUNT_CONFIRM_PASSWORD = "CREATE_ACCOUNT_CONFIRM_PASSWORD";
const CREATE_ACCOUNT_CONFIRM_PASSWORD_RESET =
  "CREATE_ACCOUNT_CONFIRM_PASSWORD_RESET";

const createAccountConfirmPasswordReducer = (
  state = { create_account_confirm_password: "" },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_CONFIRM_PASSWORD:
      return {
        ...state,
        create_account_confirm_password: action.create_account_confirm_password
      };
    case CREATE_ACCOUNT_CONFIRM_PASSWORD_RESET:
      return { ...state, create_account_confirm_password: "" };
    default:
      return { ...state };
  }
};

export default createAccountConfirmPasswordReducer;
