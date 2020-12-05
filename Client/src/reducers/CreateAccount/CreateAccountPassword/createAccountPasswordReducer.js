const CREATE_ACCOUNT_PASSWORD = "CREATE_ACCOUNT_PASSWORD";
const CREATE_ACCOUNT_PASSWORD_RESET = "CREATE_ACCOUNT_PASSWORD_RESET";

const createAccountPasswordReducer = (
  state = { create_account_password: "" },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_PASSWORD:
      return {
        ...state,
        create_account_password: action.create_account_password
      };
    case CREATE_ACCOUNT_PASSWORD_RESET:
      return { ...state, create_account_password: "" };
    default:
      return { ...state };
  }
};

export default createAccountPasswordReducer;
