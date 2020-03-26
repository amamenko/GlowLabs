const CREATE_ACCOUNT_PHONE_NUMBER_INVALID =
  "CREATE_ACCOUNT_PHONE_NUMBER_INVALID";
const CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID =
  "CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID";

const createAccountPhoneNumberInvalidReducer = (
  state = { create_account_phone_number_invalid: false },
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT_PHONE_NUMBER_INVALID:
      return { ...state, create_account_phone_number_invalid: true };
    case CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID:
      return { ...state, create_account_phone_number_invalid: false };
    default:
      return { ...state };
  }
};

export default createAccountPhoneNumberInvalidReducer;
