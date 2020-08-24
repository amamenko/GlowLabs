const ADMIN_PERSONAL_EVENT_NOTES = "ADMIN_PERSONAL_EVENT_NOTES";
const ADMIN_PERSONAL_EVENT_NOTES_RESET = "ADMIN_PERSONAL_EVENT_NOTES_RESET";

const adminPersonalEventNotesReducer = (state = { notes: "" }, action) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_NOTES:
      return { ...state, notes: action.notes };
    case ADMIN_PERSONAL_EVENT_NOTES_RESET:
      return { ...state, notes: "" };
    default:
      return { ...state };
  }
};

export default adminPersonalEventNotesReducer;
