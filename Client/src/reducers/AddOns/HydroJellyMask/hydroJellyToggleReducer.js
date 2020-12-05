const HYDRO_JELLY_TOGGLE = "HYDRO_JELLY_TOGGLE";
const HYDRO_JELLY_TOGGLE_RESET = "HYDRO_JELLY_TOGGLE_RESET";

const hydroJellyToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case HYDRO_JELLY_TOGGLE:
      return { ...state, toggle: true };
    case HYDRO_JELLY_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default hydroJellyToggleReducer;
