const ADMIN_APPOINTMENT_TIME = "ADMIN_APPOINTMENT_TIME";
const ADMIN_APPOINTMENT_TIME_RESET = "ADMIN_APPOINTMENT_TIME_RESET";

const adminAppointmentTimeReducer = (
  state = { admin_appointment_time: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_APPOINTMENT_TIME:
      return {
        ...state,
        admin_appointment_time: action.admin_appointment_time,
      };
    case ADMIN_APPOINTMENT_TIME_RESET:
      return { ...state, admin_appointment_time: "" };
    default:
      return { ...state };
  }
};

export default adminAppointmentTimeReducer;
