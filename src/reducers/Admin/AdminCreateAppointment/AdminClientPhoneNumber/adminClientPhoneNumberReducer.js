const ADMIN_CLIENT_PHONE_NUMBER = "ADMIN_CLIENT_PHONE_NUMBER";
const ADMIN_CLIENT_PHONE_NUMBER_RESET = "ADMIN_CLIENT_PHONE_NUMBER_RESET";

const adminClientPhoneNumberReducer = (
  state = { admin_client_phone_number: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_CLIENT_PHONE_NUMBER:
      return {
        ...state,
        admin_client_phone_number: action.admin_client_phone_number,
      };
    case ADMIN_CLIENT_PHONE_NUMBER_RESET:
      return { ...state, admin_client_phone_number: "" };
    default:
      return { ...state };
  }
};

export default adminClientPhoneNumberReducer;
