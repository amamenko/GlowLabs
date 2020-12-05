const ADMIN_APPOINTMENT_DURATION = "ADMIN_APPOINTMENT_DURATION";

const ACTION_ADMIN_APPOINTMENT_DURATION = (admin_appointment_duration) => {
  return {
    type: ADMIN_APPOINTMENT_DURATION,
    admin_appointment_duration,
  };
};

export default ACTION_ADMIN_APPOINTMENT_DURATION;
