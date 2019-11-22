const CALM_TOGGLE = "CALM_TOGGLE";
const CALM_TOGGLE_RESET = "CALM_TOGGLE_RESET";

const calmToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case CALM_TOGGLE:
      return { ...state, toggle: true };
    case CALM_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default calmToggleReducer;
