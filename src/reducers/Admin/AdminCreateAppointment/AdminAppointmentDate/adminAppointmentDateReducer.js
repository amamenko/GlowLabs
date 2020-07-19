const ADMIN_APPOINTMENT_DATE = "ADMIN_APPOINTMENT_DATE";
const ADMIN_APPOINTMENT_DATE_RESET = "ADMIN_APPOINTMENT_DATE_RESET";

const adminAppointmentDateReducer = (
  state = { admin_appointment_date: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_APPOINTMENT_DATE:
      return {
        ...state,
        admin_appointment_date: action.admin_appointment_date,
      };
    case ADMIN_APPOINTMENT_DATE_RESET:
      return { ...state, admin_appointment_date: "" };
    default:
      return { ...state };
  }
};

export default adminAppointmentDateReducer;
