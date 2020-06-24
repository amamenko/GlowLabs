const JET_HYDRO_PEEL_TOGGLE = "JET_HYDRO_PEEL_TOGGLE";
const JET_HYDRO_PEEL_TOGGLE_RESET = "JET_HYDRO_PEEL_TOGGLE_RESET";

const jetHydroPeelToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case JET_HYDRO_PEEL_TOGGLE:
      return { ...state, toggle: true };
    case JET_HYDRO_PEEL_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default jetHydroPeelToggleReducer;
