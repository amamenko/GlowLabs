const PHONE_NUMBER = "PHONE_NUMBER";
const PHONE_NUMBER_RESET = "PHONE_NUMBER_RESET";

const phoneNumberReducer = (state = { phone_number: "" }, action) => {
  switch (action.type) {
    case PHONE_NUMBER:
      return { ...state, phone_number: action.phone_number };
    case PHONE_NUMBER_RESET:
      return { ...state, phone_number: "" };
    default:
      return { ...state };
  }
};

export default phoneNumberReducer;
