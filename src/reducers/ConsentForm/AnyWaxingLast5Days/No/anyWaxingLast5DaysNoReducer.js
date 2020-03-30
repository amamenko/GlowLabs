const ANY_WAXING_LAST_5_DAYS_NO = "ANY_WAXING_LAST_5_DAYS_NO";
const ANY_WAXING_LAST_5_DAYS_NO_RESET = "ANY_WAXING_LAST_5_DAYS_NO_RESET";

const anyWaxingLast5DaysNoReducer = (
  state = { any_waxing_last_5_days_no_active: false },
  action
) => {
  switch (action.type) {
    case ANY_WAXING_LAST_5_DAYS_NO:
      return { ...state, any_waxing_last_5_days_no_active: true };
    case ANY_WAXING_LAST_5_DAYS_NO_RESET:
      return { ...state, any_waxing_last_5_days_no_active: false };
    default:
      return { ...state };
  }
};

export default anyWaxingLast5DaysNoReducer;
