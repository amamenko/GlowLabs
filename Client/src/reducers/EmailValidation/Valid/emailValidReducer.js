const EMAIL_VALID = "EMAIL_VALID";
const EMAIL_NOT_VALID = "EMAIL_NOT_VALID";

const emailValidReducer = (state = { email_valid: false }, action) => {
  switch (action.type) {
    case EMAIL_VALID:
      return { ...state, email_valid: true };
    case EMAIL_NOT_VALID:
      return { ...state, email_valid: false };
    default:
      return { ...state };
  }
};

export default emailValidReducer;
