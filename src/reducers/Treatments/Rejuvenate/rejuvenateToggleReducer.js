const REJUVENATE_TOGGLE = "REJUVENATE_TOGGLE";
const REJUVENATE_TOGGLE_RESET = "REJUVENATE_TOGGLE_RESET";

const rejuvenateToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case REJUVENATE_TOGGLE:
      return { ...state, toggle: true };
    case REJUVENATE_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default rejuvenateToggleReducer;
