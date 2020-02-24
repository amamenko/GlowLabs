const APPOINTMENT_END_TIME = "APPOINTMENT_END_TIME";
const APPOINTMENT_END_TIME_RESET = "APPOINTMENT_END_TIME_RESET";

const appointmentEndTimeReducer = (state = { end_time: "" }, action) => {
  switch (action.type) {
    case APPOINTMENT_END_TIME:
      return { ...state, end_time: action.end_time };
    case APPOINTMENT_END_TIME_RESET:
      return { ...state, end_time: "" };
    default:
      return { ...state };
  }
};

export default appointmentEndTimeReducer;
