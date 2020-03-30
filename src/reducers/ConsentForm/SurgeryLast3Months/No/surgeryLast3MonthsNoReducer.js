const SURGERY_LAST_3_MONTHS_NO = "SURGERY_LAST_3_MONTHS_NO";
const SURGERY_LAST_3_MONTHS_NO_RESET = "SURGERY_LAST_3_MONTHS_NO_RESET";

const surgeryLast3MonthsNoReducer = (
  state = { surgery_last_3_months_no_active: false },
  action
) => {
  switch (action.type) {
    case SURGERY_LAST_3_MONTHS_NO:
      return { ...state, surgery_last_3_months_no_active: true };
    case SURGERY_LAST_3_MONTHS_NO_RESET:
      return { ...state, surgery_last_3_months_no_active: false };
    default:
      return { ...state };
  }
};

export default surgeryLast3MonthsNoReducer;
