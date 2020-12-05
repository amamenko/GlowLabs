const SELECTED_SALT_CAVE_DURATION = "SELECTED_SALT_CAVE_DURATION";
const SELECTED_SALT_CAVE_DURATION_RESET = "SELECTED_SALT_CAVE_DURATION_RESET";

const selectedSaltCaveDurationReducer = (state = { duration: 30 }, action) => {
  switch (action.type) {
    case SELECTED_SALT_CAVE_DURATION:
      return { ...state, duration: action.duration };
    case SELECTED_SALT_CAVE_DURATION_RESET:
      return { ...state, duration: 30 };
    default:
      return { ...state };
  }
};

export default selectedSaltCaveDurationReducer;
