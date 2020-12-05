const EMAIL_INVALID = "EMAIL_INVALID";
const EMAIL_NOT_INVALID = "EMAIL_NOT_INVALID";

const emailInvalidReducer = (state = { email_invalid: false }, action) => {
  switch (action.type) {
    case EMAIL_INVALID:
      return { ...state, email_invalid: true };
    case EMAIL_NOT_INVALID:
      return { ...state, email_invalid: false };
    default:
      return { ...state };
  }
};

export default emailInvalidReducer;
