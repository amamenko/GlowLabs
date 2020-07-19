const ADMIN_APPOINTMENT_NOTES = "ADMIN_APPOINTMENT_NOTES";
const ADMIN_APPOINTMENT_NOTES_RESET = "ADMIN_APPOINTMENT_NOTES_RESET";

const adminAppointmentNotesReducer = (
  state = { admin_appointment_notes: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_APPOINTMENT_NOTES:
      return {
        ...state,
        admin_appointment_notes: action.admin_appointment_notes,
      };
    case ADMIN_APPOINTMENT_NOTES_RESET:
      return { ...state, admin_appointment_notes: "" };
    default:
      return { ...state };
  }
};

export default adminAppointmentNotesReducer;
