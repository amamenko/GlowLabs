const QUICKIE_TOGGLE = "QUICKIE_TOGGLE";
const QUICKIE_TOGGLE_RESET = "QUICKIE_TOGGLE_RESET";

const quickieToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case QUICKIE_TOGGLE:
      return { ...state, toggle: true };
    case QUICKIE_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default quickieToggleReducer;
