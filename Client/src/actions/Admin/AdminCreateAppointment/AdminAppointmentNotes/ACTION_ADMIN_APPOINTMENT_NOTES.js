const ADMIN_APPOINTMENT_NOTES = "ADMIN_APPOINTMENT_NOTES";

const ACTION_ADMIN_APPOINTMENT_NOTES = (admin_appointment_notes) => {
  return {
    type: ADMIN_APPOINTMENT_NOTES,
    admin_appointment_notes,
  };
};

export default ACTION_ADMIN_APPOINTMENT_NOTES;
