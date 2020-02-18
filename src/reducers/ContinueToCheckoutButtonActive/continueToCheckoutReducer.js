const CONTINUE_BUTTON_ACTIVE = "CONTINUE_BUTTON_ACTIVE";
const CONTINUE_BUTTON_RESET = "CONTINUE_BUTTON_RESET";

const continueToCheckoutButtonReducer = (
  state = { continueButtonActive: false },
  action
) => {
  switch (action.type) {
    case CONTINUE_BUTTON_ACTIVE:
      return { ...state, continueButtonActive: true };
    case CONTINUE_BUTTON_RESET:
      return { ...state, continueButtonActive: false };
    default:
      return { ...state };
  }
};

export default continueToCheckoutButtonReducer;
