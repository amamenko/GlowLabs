const ADMIN_APPOINTMENT_TIME = "ADMIN_APPOINTMENT_TIME";

const ACTION_ADMIN_APPOINTMENT_TIME = (admin_appointment_time) => {
  return {
    type: ADMIN_APPOINTMENT_TIME,
    admin_appointment_time,
  };
};

export default ACTION_ADMIN_APPOINTMENT_TIME;
