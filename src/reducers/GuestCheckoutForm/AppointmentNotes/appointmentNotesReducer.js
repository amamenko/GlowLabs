const APPOINTMENT_NOTES = "APPOINTMENT_NOTES";
const APPOINTMENT_NOTES_RESET = "APPOINTMENT_NOTES_RESET";

const appointmentNotesReducer = (state = { appointment_notes: "" }, action) => {
  switch (action.type) {
    case APPOINTMENT_NOTES:
      return { ...state, appointment_notes: action.appointment_notes };
    case APPOINTMENT_NOTES_RESET:
      return { ...state, appointment_notes: "" };
    default:
      return { ...state };
  }
};

export default appointmentNotesReducer;
