const SURGERY_LAST_3_MONTHS_YES = "SURGERY_LAST_3_MONTHS_YES";
const SURGERY_LAST_3_MONTHS_YES_RESET = "SURGERY_LAST_3_MONTHS_YES_RESET";

const surgeryLast3MonthsYesReducer = (
  state = { surgery_last_3_months_yes_active: false },
  action
) => {
  switch (action.type) {
    case SURGERY_LAST_3_MONTHS_YES:
      return { ...state, surgery_last_3_months_yes_active: true };
    case SURGERY_LAST_3_MONTHS_YES_RESET:
      return { ...state, surgery_last_3_months_yes_active: false };
    default:
      return { ...state };
  }
};

export default surgeryLast3MonthsYesReducer;
