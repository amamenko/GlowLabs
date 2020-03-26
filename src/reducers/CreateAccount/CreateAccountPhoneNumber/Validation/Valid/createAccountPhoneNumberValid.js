const CREATE_ACCOUNT_PHONE_NUMBER_VALID = "CREATE_ACCOUNT_PHONE_NUMBER_VALID";
const CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID =
  "CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID";

const createAccountPhoneNumberValidReducer = (
  state = { create_account_phone_number_valid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_PHONE_NUMBER_VALID:
      return { ...state, create_account_phone_number_valid: true };
    case CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID:
      return { ...state, create_account_phone_number_valid: false };
    default:
      return { ...state };
  }
};

export default createAccountPhoneNumberValidReducer;
