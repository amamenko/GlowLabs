const APPOINTMENT_NOTES = "APPOINTMENT_NOTES";

const ACTION_APPOINTMENT_NOTES = appointment_notes => {
  return {
    type: APPOINTMENT_NOTES,
    appointment_notes
  };
};

export default ACTION_APPOINTMENT_NOTES;
