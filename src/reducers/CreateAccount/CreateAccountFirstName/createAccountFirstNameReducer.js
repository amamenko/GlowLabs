const CREATE_ACCOUNT_FIRST_NAME = "CREATE_ACCOUNT_FIRST_NAME";
const CREATE_ACCOUNT_FIRST_NAME_RESET = "CREATE_ACCOUNT_FIRST_NAME_RESET";

const createAccountFirstNameReducer = (
  state = { create_account_first_name: "" },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_FIRST_NAME:
      return {
        ...state,
        create_account_first_name: action.create_account_first_name
      };
    case CREATE_ACCOUNT_FIRST_NAME_RESET:
      return { ...state, create_account_first_name: "" };
    default:
      return { ...state };
  }
};

export default createAccountFirstNameReducer;
