const GUASHA_TOGGLE = "GUASHA_TOGGLE";
const GUASHA_TOGGLE_RESET = "GUASHA_TOGGLE_RESET";

const guashaToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case GUASHA_TOGGLE:
      return { ...state, toggle: true };
    case GUASHA_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default guashaToggleReducer;
