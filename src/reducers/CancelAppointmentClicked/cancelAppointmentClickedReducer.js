const CANCEL_APPOINTMENT_CLICKED = "CANCEL_APPOINTMENT_CLICKED";
const CANCEL_APPOINTMENT_CLICKED_RESET = "CANCEL_APPOINTMENT_CLICKED_RESET";

const cancelAppointmentClickedReducer = (
  state = { cancelAppointmentClicked: false },
  action
) => {
  switch (action.type) {
    case CANCEL_APPOINTMENT_CLICKED:
      return { ...state, cancelAppointmentClicked: true };
    case CANCEL_APPOINTMENT_CLICKED_RESET:
      return { ...state, cancelAppointmentClicked: false };
    default:
      return { ...state };
  }
};

export default cancelAppointmentClickedReducer;
