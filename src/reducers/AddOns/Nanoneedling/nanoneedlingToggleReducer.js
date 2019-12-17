const NANONEEDLING_TOGGLE = "NANONEEDLING_TOGGLE";
const NANONEEDLING_TOGGLE_RESET = "NANONEEDLING_TOGGLE_RESET";

const nanoneedlingToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case NANONEEDLING_TOGGLE:
      return { ...state, toggle: true };
    case NANONEEDLING_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default nanoneedlingToggleReducer;
