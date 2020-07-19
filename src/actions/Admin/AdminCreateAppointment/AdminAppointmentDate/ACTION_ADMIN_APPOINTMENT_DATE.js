const ADMIN_APPOINTMENT_DATE = "ADMIN_APPOINTMENT_DATE";

const ACTION_ADMIN_APPOINTMENT_DATE = (admin_appointment_date) => {
  return {
    type: ADMIN_APPOINTMENT_DATE,
    admin_appointment_date,
  };
};

export default ACTION_ADMIN_APPOINTMENT_DATE;
