const CREATE_ACCOUNT_LAST_NAME = "CREATE_ACCOUNT_LAST_NAME";
const CREATE_ACCOUNT_LAST_NAME_RESET = "CREATE_ACCOUNT_LAST_NAME_RESET";

const createAccountLastNameReducer = (
  state = { create_account_last_name: "" },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_LAST_NAME:
      return {
        ...state,
        create_account_last_name: action.create_account_last_name
      };
    case CREATE_ACCOUNT_LAST_NAME_RESET:
      return { ...state, create_account_last_name: "" };
    default:
      return { ...state };
  }
};

export default createAccountLastNameReducer;
