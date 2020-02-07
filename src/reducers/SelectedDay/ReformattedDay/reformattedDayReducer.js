const REFORMATTED_DAY = "REFORMATTED_DAY";

const reformattedDayReducer = (state = { reformattedDay: "" }, action) => {
  switch (action.type) {
    case REFORMATTED_DAY:
      return { ...state, reformattedDay: action.day };
    default:
      return { ...state };
  }
};

export default reformattedDayReducer;
