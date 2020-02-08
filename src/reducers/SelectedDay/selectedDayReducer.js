const SELECTED_DAY = "SELECTED_DAY";
const SELECTED_DAY_RESET = "SELECTED_DAY_RESET";

const selectedDayReducer = (state = { selectedDay: "" }, action) => {
  switch (action.type) {
    case SELECTED_DAY:
      return { ...state, selectedDay: action.day };
    case SELECTED_DAY_RESET:
      return { ...state, selectedDay: "" };
    default:
      return { ...state };
  }
};

export default selectedDayReducer;
