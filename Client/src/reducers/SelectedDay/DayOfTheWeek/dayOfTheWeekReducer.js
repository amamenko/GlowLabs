const DAY_OF_THE_WEEK = "DAY_OF_THE_WEEK";
const DAY_OF_THE_WEEK_RESET = "DAY_OF_THE_WEEK_RESET";

const dayOfTheWeekReducer = (state = { dayOfTheWeek: "" }, action) => {
  switch (action.type) {
    case DAY_OF_THE_WEEK:
      return { ...state, dayOfTheWeek: action.day };
    case DAY_OF_THE_WEEK_RESET:
      return { ...state, dayOfTheWeek: "" };
    default:
      return { ...state };
  }
};

export default dayOfTheWeekReducer;
