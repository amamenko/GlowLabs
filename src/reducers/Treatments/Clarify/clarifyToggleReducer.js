const CLARIFY_TOGGLE = "CLARIFY_TOGGLE";
const CLARIFY_TOGGLE_RESET = "CLARIFY_TOGGLE_RESET";

const clarifyToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case CLARIFY_TOGGLE:
      return { ...state, toggle: true };
    case CLARIFY_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default clarifyToggleReducer;
