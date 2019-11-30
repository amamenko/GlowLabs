const MICRONEEDLE_TOGGLE = "MICRONEEDLE_TOGGLE";
const MICRONEEDLE_TOGGLE_RESET = "MICRONEEDLE_TOGGLE_RESET";

const microneedleToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case MICRONEEDLE_TOGGLE:
      return { ...state, toggle: true };
    case MICRONEEDLE_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default microneedleToggleReducer;
