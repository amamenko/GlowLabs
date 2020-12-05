const ADMIN_APPOINTMENT_DURATION = "ADMIN_APPOINTMENT_DURATION";
const ADMIN_APPOINTMENT_DURATION_RESET = "ADMIN_APPOINTMENT_DURATION_RESET";

const adminAppointmentDurationReducer = (
  state = { admin_appointment_duration: 0 },
  action
) => {
  switch (action.type) {
    case ADMIN_APPOINTMENT_DURATION:
      return {
        ...state,
        admin_appointment_duration: action.admin_appointment_duration,
      };
    case ADMIN_APPOINTMENT_DURATION_RESET:
      return { ...state, admin_appointment_duration: 0 };
    default:
      return { ...state };
  }
};

export default adminAppointmentDurationReducer;
