const CREATE_ACCOUNT_PHONE_NUMBER = "CREATE_ACCOUNT_PHONE_NUMBER";
const CREATE_ACCOUNT_PHONE_NUMBER_RESET = "CREATE_ACCOUNT_PHONE_NUMBER_RESET";

const createAccountPhoneNumberReducer = (
  state = { create_account_phone_number: "" },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_PHONE_NUMBER:
      return {
        ...state,
        create_account_phone_number: action.create_account_phone_number
      };
    case CREATE_ACCOUNT_PHONE_NUMBER_RESET:
      return { ...state, create_account_phone_number: "" };
    default:
      return { ...state };
  }
};

export default createAccountPhoneNumberReducer;
