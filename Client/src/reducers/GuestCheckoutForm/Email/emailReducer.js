const EMAIL = "EMAIL";
const EMAIL_RESET = "EMAIL_RESET";

const emailReducer = (state = { email: "" }, action) => {
  switch (action.type) {
    case EMAIL:
      return { ...state, email: action.email };
    case EMAIL_RESET:
      return { ...state, email: "" };
    default:
      return { ...state };
  }
};

export default emailReducer;
