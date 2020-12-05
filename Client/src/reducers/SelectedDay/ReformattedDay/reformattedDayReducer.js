const REFORMATTED_DAY = "REFORMATTED_DAY";
const REFORMATTED_DAY_RESET = "REFORMATTED_DAY_RESET";

const reformattedDayReducer = (state = { reformattedDay: "" }, action) => {
  switch (action.type) {
    case REFORMATTED_DAY:
      return { ...state, reformattedDay: action.day };
    case REFORMATTED_DAY_RESET:
      return { ...state, reformattedDay: "" };
    default:
      return { ...state };
  }
};

export default reformattedDayReducer;
