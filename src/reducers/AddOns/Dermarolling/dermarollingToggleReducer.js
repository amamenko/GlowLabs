const DERMAROLLING_TOGGLE = "DERMAROLLING_TOGGLE";
const DERMAROLLING_TOGGLE_RESET = "DERMAROLLING_TOGGLE_RESET";

const dermarollingToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case DERMAROLLING_TOGGLE:
      return { ...state, toggle: true };
    case DERMAROLLING_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default dermarollingToggleReducer;
