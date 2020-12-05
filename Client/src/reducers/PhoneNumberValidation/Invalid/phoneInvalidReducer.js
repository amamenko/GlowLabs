const PHONE_INVALID = "PHONE_INVALID";
const PHONE_NOT_INVALID = "PHONE_NOT_INVALID";

const phoneInvalidReducer = (state = { phone_invalid: false }, action) => {
  switch (action.type) {
    case PHONE_INVALID:
      return { ...state, phone_invalid: true };
    case PHONE_NOT_INVALID:
      return { ...state, phone_invalid: false };
    default:
      return { ...state };
  }
};

export default phoneInvalidReducer;
