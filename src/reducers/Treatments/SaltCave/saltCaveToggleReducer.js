const SALT_CAVE_TOGGLE = "SALT_CAVE_TOGGLE";
const SALT_CAVE_TOGGLE_RESET = "SALT_CAVE_TOGGLE_RESET";

const saltCaveToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case SALT_CAVE_TOGGLE:
      return { ...state, toggle: true };
    case SALT_CAVE_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default saltCaveToggleReducer;
