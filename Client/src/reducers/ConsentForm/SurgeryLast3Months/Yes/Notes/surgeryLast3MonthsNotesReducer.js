const SURGERY_LAST_3_MONTHS_NOTES = "SURGERY_LAST_3_MONTHS_NOTES";
const SURGERY_LAST_3_MONTHS_NOTES_RESET = "SURGERY_LAST_3_MONTHS_NOTES_RESET";

const surgeryLast3MonthsNotesReducer = (
  state = { surgery_last_3_months_notes: "" },
  action
) => {
  switch (action.type) {
    case SURGERY_LAST_3_MONTHS_NOTES:
      return {
        ...state,
        surgery_last_3_months_notes: action.surgery_last_3_months_notes
      };
    case SURGERY_LAST_3_MONTHS_NOTES_RESET:
      return { ...state, surgery_last_3_months_notes: "" };
    default:
      return { ...state };
  }
};

export default surgeryLast3MonthsNotesReducer;
