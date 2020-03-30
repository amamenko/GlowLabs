const ANY_WAXING_LAST_5_DAYS_YES = "ANY_WAXING_LAST_5_DAYS_YES";
const ANY_WAXING_LAST_5_DAYS_YES_RESET = "ANY_WAXING_LAST_5_DAYS_YES_RESET";

const anyWaxingLast5DaysYesReducer = (
  state = { any_waxing_last_5_days_yes_active: false },
  action
) => {
  switch (action.type) {
    case ANY_WAXING_LAST_5_DAYS_YES:
      return { ...state, any_waxing_last_5_days_yes_active: true };
    case ANY_WAXING_LAST_5_DAYS_YES_RESET:
      return { ...state, any_waxing_last_5_days_yes_active: false };
    default:
      return { ...state };
  }
};

export default anyWaxingLast5DaysYesReducer;
