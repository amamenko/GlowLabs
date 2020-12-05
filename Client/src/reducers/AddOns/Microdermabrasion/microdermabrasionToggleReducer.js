const MICRODERMABRASION_TOGGLE = "MICRODERMABRASION_TOGGLE";
const MICRODERMABRASION_TOGGLE_RESET = "MICRODERMABRASION_TOGGLE_RESET";

const microdermabrasionToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case MICRODERMABRASION_TOGGLE:
      return { ...state, toggle: true };
    case MICRODERMABRASION_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default microdermabrasionToggleReducer;
