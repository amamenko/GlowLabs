const ADMIN_PERSONAL_EVENT_DATE = "ADMIN_PERSONAL_EVENT_DATE";
const ADMIN_PERSONAL_EVENT_DATE_RESET = "ADMIN_PERSONAL_EVENT_DATE_RESET";

const adminPersonalEventDateReducer = (state = { date: "" }, action) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_DATE:
      return { ...state, date: action.date };
    case ADMIN_PERSONAL_EVENT_DATE_RESET:
      return { ...state, date: "" };
    default:
      return { ...state };
  }
};

export default adminPersonalEventDateReducer;
