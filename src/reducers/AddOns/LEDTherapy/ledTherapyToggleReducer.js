const LED_THERAPY_TOGGLE = "LED_THERAPY_TOGGLE";
const LED_THERAPY_TOGGLE_RESET = "LED_THERAPY_TOGGLE_RESET";

const ledTherapyToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case LED_THERAPY_TOGGLE:
      return { ...state, toggle: true };
    case LED_THERAPY_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default ledTherapyToggleReducer;
