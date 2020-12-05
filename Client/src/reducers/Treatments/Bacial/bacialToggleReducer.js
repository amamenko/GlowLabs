const BACIAL_TOGGLE = "BACIAL_TOGGLE";
const BACIAL_TOGGLE_RESET = "BACIAL_TOGGLE_RESET";

const bacialToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case BACIAL_TOGGLE:
      return { ...state, toggle: true };
    case BACIAL_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default bacialToggleReducer;
