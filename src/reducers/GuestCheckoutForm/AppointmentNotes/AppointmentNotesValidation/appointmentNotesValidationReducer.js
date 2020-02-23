const APPOINTMENT_NOTES_VALID = "APPOINTMENT_NOTES_VALID";
const APPOINTMENT_NOTES_INVALID = "APPOINTMENT_NOTES_INVALID";

const appointmentNotesValidationReducer = (
  state = { appointmentNotesValid: true },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_NOTES_VALID:
      return { ...state, appointmentNotesValid: true };
    case APPOINTMENT_NOTES_INVALID:
      return { ...state, appointmentNotesValid: false };
    default:
      return { ...state };
  }
};

export default appointmentNotesValidationReducer;
