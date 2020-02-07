const DAY_OF_THE_WEEK = "DAY_OF_THE_WEEK";

const dayOfTheWeekReducer = (state = { dayOfTheWeek: "" }, action) => {
  switch (action.type) {
    case DAY_OF_THE_WEEK:
      return { ...state, dayOfTheWeek: action.day };
    default:
      return { ...state };
  }
};

export default dayOfTheWeekReducer;
