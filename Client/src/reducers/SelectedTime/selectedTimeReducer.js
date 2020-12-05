const SELECTED_TIME = "SELECTED_TIME";
const SELECTED_TIME_RESET = "SELECTED_TIME_RESET";

const selectedTimeReducer = (state = { selectedTime: "" }, action) => {
  switch (action.type) {
    case SELECTED_TIME:
      return { ...state, selectedTime: action.time };
    case SELECTED_TIME_RESET:
      return { ...state, selectedTime: "" };
    default:
      return { ...state };
  }
};

export default selectedTimeReducer;
