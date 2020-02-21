const PHONE_VALID = "PHONE_VALID";
const PHONE_NOT_VALID = "PHONE_NOT_VALID";

const phoneValidReducer = (state = { phone_valid: false }, action) => {
  switch (action.type) {
    case PHONE_VALID:
      return { ...state, phone_valid: true };
    case PHONE_NOT_VALID:
      return { ...state, phone_valid: false };
    default:
      return { ...state };
  }
};

export default phoneValidReducer;
