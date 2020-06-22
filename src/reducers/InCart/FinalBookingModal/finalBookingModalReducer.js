const FINAL_BOOKING_MODAL_ACTIVE = "FINAL_BOOKING_MODAL_ACTIVE";
const FINAL_BOOKING_MODAL_RESET = "FINAL_BOOKING_MODAL_RESET";

const finalBookingModalReducer = (
  state = { final_booking_modal: false },
  action
) => {
  switch (action.type) {
    case FINAL_BOOKING_MODAL_ACTIVE:
      return { ...state, final_booking_modal: true };
    case FINAL_BOOKING_MODAL_RESET:
      return { ...state, final_booking_modal: false };
    default:
      return { ...state };
  }
};

export default finalBookingModalReducer;
