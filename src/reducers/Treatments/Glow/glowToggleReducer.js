const GLOW_TOGGLE = "GLOW_TOGGLE";
const GLOW_TOGGLE_RESET = "GLOW_TOGGLE_RESET";

const glowToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case GLOW_TOGGLE:
      return { ...state, toggle: true };
    case GLOW_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default glowToggleReducer;
